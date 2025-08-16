// app/about/page.jsx (Next.js 13+ App Router)
// or pages/about.js (if using Pages Router)

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <div className="bg-white text-gray-900">
    

      {/* Gallery Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-4 md:px-12">
        <div className="relative h-48 md:h-72 overflow-hidden rounded-xl">
          <Image
            src="/images/beauty1.jpg"
            alt="Skincare collection"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="relative h-48 md:h-72 overflow-hidden rounded-xl">
          <Image
            src="/images/beauty2.jpg"
            alt="Luxury beauty essentials"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="relative h-48 md:h-72 overflow-hidden rounded-xl">
          <Image
            src="/images/beauty3.jpg"
            alt="Natural body care"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="relative h-48 md:h-72 overflow-hidden rounded-xl">
          <Image
            src="/images/beauty4.jpg"
            alt="Sustainable luxury"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

     
      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 py-16 bg-neutral-200">
        <div className="text-center">
          <h3 className="font-semibold text-xl mb-2">Interest-Free Payments</h3>
          <p className="text-gray-600">
            Shop now, pay later—available for all orders above KES 3500.
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-xl mb-2">Expert Care</h3>
          <p className="text-gray-600">
            Our team of beauty specialists and skincare experts is always here
            to guide and support you.
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-xl mb-2">100% Authentic Products</h3>
          <p className="text-gray-600">
            Every item is sourced directly from trusted manufacturers—no
            imitations, only originals.
          </p>
        </div>
      </section>
    </div>
  );
}
