"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Offers from "@/app/components/Offers";
import Gallery from "@/app/components/Gallery";
import { useCart } from "@/app/context/CartContext"; // use global cart

export default function ProductInfoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); // global cart

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const foundProduct = storedProducts.find((p) => p.id.toString() === id);
    if (!foundProduct) {
      console.warn("Product not found");
    } else {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product); // immediately update global cart
  };

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-10 text-xl">
        Product not found.
      </p>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 min-h-screen flex items-center justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {/* Product Image */}
    <div className="flex justify-center items-start">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-3xl shadow-xl w-full max-w-lg object-cover"
      />
    </div>

    {/* Product Details */}
    <div className="flex flex-col justify-start space-y-6">
      <h1 className="text-5xl font-extrabold text-gray-900">{product.name}</h1>
      <p className="text-3xl font-bold text-black">
        KES {product.price.toLocaleString()}
      </p>
      {product.description && (
        <p className="text-gray-700 leading-relaxed text-lg">
          {product.description}
        </p>
      )}

      {product.tutorialLink && (
        <a
          href={product.tutorialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-700 underline font-medium"
        >
          Watch Tutorial →
        </a>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Add to Cart
        </button>
        <button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-6 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition w-full sm:w-auto"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</div>


 <section className="max-w-7xl mx-auto my-2 px-6 py-16">
      
        
        <Offers />
      </section>
      {/* Gallery Section */}
      <section className=" mx-auto px-6 py-16">
       
        <Gallery />
      </section>
    </>
  );
}
