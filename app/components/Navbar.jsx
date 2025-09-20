"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import { products } from "@/app/data/products";
import { offers as products2 } from "@/app/data/products2"; // if your products2 file exports offers/products

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // combine both sources of products
  const allProducts = [...products, ...products2];

  // filter products
  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-pink-500"
          >
            True<span className="text-gray-800">Beauty</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link href="/" className="hover:text-pink-500">Home</Link>
            <Link href="/stores" className="hover:text-pink-500">Stores</Link>
            <Link href="/about" className="hover:text-pink-500">About</Link>
            <Link href="/shop" className="hover:text-pink-500">Shop</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5 text-gray-600 hover:text-pink-500 cursor-pointer transition-colors hidden sm:block" />
            </button>

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
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="flex flex-col items-center space-y-6 py-6 text-gray-700 font-medium text-lg">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/stores" onClick={() => setMenuOpen(false)}>Stores</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          </div>
        </div>
      )}

      {/* Search Drawer */}
      {searchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 p-4">
          <input
            type="text"
            placeholder="Search for beauty products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          
          {/* Results */}
          {query && (
            <div className="mt-4 max-h-80 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <ul className="space-y-3">
                  {filteredProducts.map((product, i) => (
                    <Link
                       key={i}
                      href={`/productinfo/${product.id}`}
                   onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                 <img
                    src={product.image}
                    alt={product.name}
                   className="w-12 h-12 object-cover rounded"
                />
            <div>
               <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">KES {product.price}</p>
           </div>
           </Link>

                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No products found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} setIsOpen={setCartOpen} />
    </nav>
  );
}
