"use client";

import { offers } from "@/app/data/products2";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function Offers() {
  const { addToCart } = useCart();
  const router = useRouter();

  // Navigate to product detail page
  const handleProductClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-left font-bold mb-10 text-gray-800">
          Special Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((product) => {
            const discount = Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            );

            return (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                onClick={() => handleProductClick(product)} // ✅ navigate on click
              >
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                  -{discount}%
                </span>

                <div className="relative w-full h-52">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-gray-400 line-through text-sm">
                      KES {product.oldPrice.toLocaleString()}
                    </span>
                    <span className="text-xl font-bold text-black">
                      KES {product.price.toLocaleString()}
                    </span>
                  </div>

                 
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...product, quantity: 1 });
                    }}
                    className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-900 transition"
                  >
                    Add to cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
