"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Category from "./components/Categories";
import TrendingProducts from "./components/TrendingProducts";
import Marquee from "./components/Marquee";

import Sales from "./components/Sales";
import ProductList from "./components/ProductList";
import Offers from "./components/Offers";
import Gallery from "./components/Gallery";

export default function Home() {
  const router = useRouter();

  const slides = [
    {
      image: "./images/beauty4.jpg",
      title: "Discover Radiant Skin Today",
      subtitle: "Luxury skincare products tailored for you",
    },
    {
      image: "./images/beauty2.jpg",
      title: "Stay Ahead with New Beauty Trends",
      subtitle: "Innovative products to enhance your natural glow",
    },
    {
      image: "./images/beauty6.jpg",
      title: "Exclusive Skincare Products Just for You",
      subtitle: "Experience luxury and care in every drop",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>

     {/* Marquee / Featured Brands */}
      <section className="bg-white pt-16">
        <Marquee />
      </section>
    <main className="font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] overflow-hidden bg-neutral-200">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            {/* Left side - Image */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-[90vh]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-l-3xl shadow-lg"
              />
            </div>

            {/* Right side - Content */}
            <motion.div
              className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-center md:text-left  md:bg-transparent"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-600">
                {slide.subtitle}
              </p>
              <button
                onClick={() => router.push("/all-products")}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all w-40 mx-auto md:mx-0"
              >
                Explore Now
              </button>
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">
          Shop by Category
        </h2>
        <Category />
      </section>

      {/* Trending Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900">
            Trending Products
          </h2>
          <TrendingProducts />
        </div>
      </section>

      {/* Sales / Promotions Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Sales />
      </section>

    

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900">
          New Arrivals
        </h2>
        <ProductList />
      </section>
      {/* Gallery Section */}
      <section className=" mx-auto px-6 py-16">
       
        <Gallery />
      </section>
       {/* Offers Section */}
      <section className="mx-auto px-6 py-16">
        <Offers />
      </section>


     
    </main>
    </>
  );
}
