"use client";

import { useParams } from "next/navigation";
import { products, categories } from "@/app/data/products";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext"; // ✅ ensure you have this

export default function CategoryProducts() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Find category name
  const category = categories.find((cat) => cat.id.toString() === id);

  // Filter products for this category
  const filteredProducts = products.filter(
    (product) => product.categoryId.toString() === id
  );

  return (
    <section className="py-22 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Category Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          {category ? category.name : "Products"}
        </motion.h1>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer group relative overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-t-2xl"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-black">
                      Ksh {product.price}
                    </span>
                  </div>
                </div>

                {/* Floating Add to Cart Button */}
                <motion.button
                  onClick={() => addToCart(product)}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                             opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 
                             bg-black text-white px-5 py-2 rounded-xl shadow-lg 
                             transition-all duration-300"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
