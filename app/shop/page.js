"use client";

import { useRouter } from "next/navigation";
import { products } from "../data/products"; 

export default function ShopPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
    Shop Our Products
  </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/product/${product.id}`)}
            className="cursor-pointer group relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow bg-white"
          >
            {/* Product Image */}
            <div className="aspect-square w-full overflow-hidden rounded-t-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h2>
              <p className="text-black font-bold mt-2">KES {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
