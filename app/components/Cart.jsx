"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function Cart({ isOpen, setIsOpen }) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotalPrice = () =>
    cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 min-h-screen bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-96`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">My Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 font-bold text-xl"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600">ksh {product.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total:</span>
              <span>ksh {calculateTotalPrice().toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
