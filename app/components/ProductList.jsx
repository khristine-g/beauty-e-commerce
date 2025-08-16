"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { products } from "../data/products"; // adjust path

export default function ProductList() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Store products in localStorage so product/[id] page can retrieve them
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, []);

  const handleProductClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent navigating to product page
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    const existingIndex = parsedCart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      parsedCart[existingIndex].quantity += 1;
    } else {
      parsedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(parsedCart));
    alert(`${product.name} added to cart!`);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 300;
    const newPos =
      direction === "left"
        ? scrollRef.current.scrollLeft - amount
        : scrollRef.current.scrollLeft + amount;
    scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
    setScrollPosition(newPos);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-left mb-10">Our Products</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 z-10 hover:bg-gray-100"
      >
        ◀
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
            className="min-w-[250px] max-w-[250px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative w-full h-64 overflow-hidden rounded-lg ">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-md font-bold text-gray-600 mt-3">
                KES {product.price.toLocaleString()}
              </p>

              {/* Always-visible Add to Cart Button (black) */}
              <button
                className="mt-4 w-full bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 z-10 hover:bg-gray-100"
      >
        ▶
      </button>
    </div>
  );
}
