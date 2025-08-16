"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // cart drawer state
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-pink-500"
          >
            Beauty<span className="text-gray-800">Store</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link href="/" className="hover:text-pink-500 transition-colors duration-200">Home</Link>
            <Link href="/stores" className="hover:text-pink-500 transition-colors duration-200">Stores</Link>
            <Link href="/about" className="hover:text-pink-500 transition-colors duration-200">About</Link>
            <Link href="/shop" className="hover:text-pink-500 transition-colors duration-200">Shop</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600 hover:text-pink-500 cursor-pointer transition-colors hidden sm:block" />

            {/* Cart Icon */}
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
              {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="flex flex-col items-center space-y-6 py-6 text-gray-700 font-medium text-lg">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">Home</Link>
            <Link href="/stores" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">Stores</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">About</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">Shop</Link>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} setIsOpen={setCartOpen} />
    </nav>
  );
}
