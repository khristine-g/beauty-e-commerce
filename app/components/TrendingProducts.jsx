"use client";
import { useCart } from "@/app/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { groups, items } from "@/app/data/products2";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TrendingProducts() {
  const [activeGroup, setActiveGroup] = useState("All");
  const scrollRef = useRef(null);
  const router = useRouter();
  const { addToCart } = useCart();

  // Store products in localStorage so /product/[id] can access them
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(items));
  }, []);

  const filteredItems = items.filter(
    (item) =>
      activeGroup === "All" ||
      item.categoryId === groups.find((group) => group.name === activeGroup)?.id
  );

  const handleProductClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  const handleQuickAdd = (product) => {
    addToCart(product); // ✅ only use context
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative" id="trending">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
         

          {/* Category Filter */}
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveGroup("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeGroup === "All"
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeGroup === group.name
                    ? "bg-black text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth px-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group relative"
                onClick={() => handleProductClick(item)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-4 relative">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    KES {item.price.toFixed(2)}
                  </p>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(item);
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                               w-68 px-6 py-3 text-lg font-semibold text-center whitespace-nowrap
                               bg-gray-950 text-white rounded-lg shadow-lg
                               opacity-0 group-hover:opacity-100
                               md:opacity-0 md:group-hover:opacity-100
                               sm:opacity-100
                               transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
