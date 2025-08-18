"use client";

import { useCart } from "@/app/context/CartContext";
import { useMemo, useState } from "react";
import Link from "next/link";
import Gallery from "./Gallery";

export default function Checkout() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [cart]
  );

  const handleStripeCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Stripe error: " + (data.error || "Unknown"));
    } catch (e) {
      console.error(e);
      alert("Stripe failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-gray-900">Checkout</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty.{" "}
            <Link href="/" className="text-pink-600 underline">
              Go Shopping
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4">
                Shipping Information
              </h3>
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="on"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="First Name"
                    required
                  />
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <input
                  type="email"
                  className="border p-3 rounded w-full"
                  placeholder="Email"
                  required
                />
                <input
                  className="border p-3 rounded w-full"
                  placeholder="Phone (e.g., 2547XXXXXXXX)"
                  required
                />
                <input
                  className="border p-3 rounded w-full"
                  placeholder="Address"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="City"
                    required
                  />
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="State"
                    required
                  />
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="Zip Code"
                    required
                  />
                </div>
              </form>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-2xl shadow h-fit">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {cart.map((p) => (
                  <div key={p.id} className="flex justify-between text-sm">
                    <span>
                      {p.name} × {p.quantity}
                    </span>
                    <span>Ksh {(p.price * p.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>KES {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
                onClick={handleStripeCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay with Card"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Gallery />
    </>
  );
}
