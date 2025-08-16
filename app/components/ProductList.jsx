"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { products } from "../data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext"; // ✅ use global cart

export default function ProductList() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const { addToCart } = useCart(); // ✅ global cart context

  // Store products in localStorage for product/[id] page
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, []);

  const handleProductClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 300;
    const newPos =
      direction === "left"
        ? scrollRef.current.scrollLeft - amount
        : scrollRef.current.scrollLeft + amount;
    scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Scrollable Row */}
      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative min-w-[250px] max-w-[250px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative w-full h-64 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />

              {/* Add to Cart button appears on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigation
                  addToCart({ ...product, quantity: 1 }); // ✅ add to global cart
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                               w-68 px-6 py-3 text-lg font-semibold text-center whitespace-nowrap
                               bg-gray-950 text-white rounded-lg shadow-lg
                               opacity-0 group-hover:opacity-100
                               md:opacity-0 md:group-hover:opacity-100
                               sm:opacity-100
                               transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-md font-bold text-gray-600 mt-3">
                KES {product.price.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100 transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
