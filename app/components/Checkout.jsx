"use client";

import { useCart } from "@/app/context/CartContext";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Gallery from "./Gallery";

export default function Checkout() {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shipping, setShipping] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const paypalContainerRef = useRef(null);
  const total = useMemo(
    () => cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [cart]
  );

  // Load PayPal script only when PayPal is selected
  useEffect(() => {
    if (paymentMethod !== "paypal") return;
    if (window.paypal) {
      renderPaypal();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = renderPaypal;
    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, total]);

  const renderPaypal = () => {
    if (!paypalContainerRef.current) return;
    paypalContainerRef.current.innerHTML = ""; // clear re-renders
    window.paypal
      .Buttons({
        style: { layout: "vertical", shape: "rect", label: "paypal" },
        createOrder: (data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: { value: total.toFixed(2) },
                description: "True Beauty order",
              },
            ],
          }),
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          alert(`PayPal payment completed by ${details.payer.name.given_name}`);
          // TODO: persist order to DB and redirect to success page
          window.location.href = "/success";
        },
        onCancel: () => (window.location.href = "/cancel"),
        onError: (err) => {
          console.error("PayPal error:", err);
          alert("PayPal failed. Please try another method.");
        },
      })
      .render(paypalContainerRef.current);
  };

  const handleStripeCheckout = async () => {
    try {
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
    }
  };

  const handleMpesa = async () => {
    try {
      if (!shipping.phone) {
        alert("Enter phone number in shipping info (format 2547XXXXXXXX).");
        return;
      }
      const res = await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: shipping.phone,
          amount: total,
          accountRef: `Order-${Date.now()}`,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert("M-Pesa error: " + data.error);
      } else {
        alert("Check your phone to complete the M-Pesa payment.");
        // You can poll your callback updates or show a waiting screen.
      }
    } catch (e) {
      console.error(e);
      alert("M-Pesa failed. Try again.");
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    if (paymentMethod === "card") return handleStripeCheckout();
    if (paymentMethod === "paypal") {
      // PayPal flow is handled by its rendered buttons
      // Optionally scroll to the PayPal container:
      paypalContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (paymentMethod === "mpesa") return handleMpesa();
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
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
              autoComplete="on"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="border p-3 rounded w-full"
                  placeholder="First Name"
                  value={shipping.first}
                  onChange={(e) => setShipping({ ...shipping, first: e.target.value })}
                  required
                />
                <input
                  className="border p-3 rounded w-full"
                  placeholder="Last Name"
                  value={shipping.last}
                  onChange={(e) => setShipping({ ...shipping, last: e.target.value })}
                  required
                />
              </div>
              <input
                type="email"
                className="border p-3 rounded w-full"
                placeholder="Email"
                value={shipping.email}
                onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                required
              />
              <input
                className="border p-3 rounded w-full"
                placeholder="Phone (e.g., 2547XXXXXXXX)"
                value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                required
              />
              <input
                className="border p-3 rounded w-full"
                placeholder="Address"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  className="border p-3 rounded w-full"
                  placeholder="City"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  required
                />
                <input
                  className="border p-3 rounded w-full"
                  placeholder="State"
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  required
                />
                <input
                  className="border p-3 rounded w-full"
                  placeholder="Zip Code"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  required
                />
              </div>
            </form>

            {/* Payment Methods */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "card", label: "Credit/Debit Card " },
                  { id: "paypal", label: "PayPal" },
                  { id: "mpesa", label: "M-Pesa" },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                      paymentMethod === m.id ? "border-pink-600 ring-2 ring-pink-100" : "hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                    />
                    {m.label}
                  </label>
                ))}
              </div>

              {/* PayPal Buttons Area */}
              {paymentMethod === "paypal" && (
                <div className="mt-6">
                  <div ref={paypalContainerRef} />
                </div>
              )}
            </div>
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
                <span>Ksh {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary action (Stripe / M-Pesa). For PayPal, buttons above handle flow */}
            <button
              className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
              onClick={placeOrder}
            >
              {paymentMethod === "card" && "Pay with Card "}
              {paymentMethod === "mpesa" && "Pay with M-Pesa"}
              {paymentMethod === "paypal" && "Use PayPal Buttons Below"}
            </button>
          </div>
        </div>
      )}
    </div>
    <Gallery />
    </>
  );
}
