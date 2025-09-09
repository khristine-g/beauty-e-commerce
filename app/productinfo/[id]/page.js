"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductInfo({ setCart }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch product from localStorage
  useEffect(() => {
    if (productId) {
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const found = storedProducts.find((p) => p.id.toString() === productId);
      if (found) setProduct(found);
    }
  }, [productId]);

  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = parsedCart.findIndex(p => p.id === product.id);

    if (existingIndex !== -1) {
      parsedCart[existingIndex].quantity += 1;
    } else {
      parsedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(parsedCart));
    setCart(parsedCart);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Product Image */}
        <motion.div
          className="w-full overflow-hidden rounded-3xl shadow-xl cursor-zoom-in"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="flex flex-col justify-between"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-gray-900">{product.name}</h1>
            <p className="text-3xl font-bold text-pink-600">Ksh {product.price.toLocaleString()}</p>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            {product.tutorialLink && (
              <a
                href={product.tutorialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-pink-600 font-medium hover:underline"
              >
                📺 Watch Tutorial
              </a>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-pink-600 text-white py-4 px-8 rounded-2xl font-semibold shadow-lg hover:bg-pink-700 transition"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="border border-gray-300 py-4 px-8 rounded-2xl font-semibold hover:bg-gray-100 transition"
            >
              Back to Products
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          className="fixed bottom-10 right-10 bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <span className="text-2xl text-green-500">✔️</span>
          <p className="font-medium text-gray-800">Product added to cart!</p>
        </motion.div>
      )}
    </section>
  );
}
