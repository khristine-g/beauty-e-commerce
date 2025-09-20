"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif tracking-wide text-gray-800"
          >
            The Essence of Radiance
          </motion.h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
  Carefully crafted formulas that turn everyday beauty into a ritual—enhancing your skin, 
  hair, and body with a radiant, confident glow that’s authentically yours.
</p>

        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
         <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
  Where It All Began
</h2>
<p className="text-lg text-gray-600 leading-relaxed">
  Our journey began with a passion for beauty that goes beyond the surface. 
  What started with everyday skincare soon expanded into hair care, body care, 
  and cosmetics designed to inspire confidence. Each product we offer is a 
  reflection of our mission—to blend quality, care, and style into every beauty ritual.
</p>

        </div>
        <img
          src="./images/beauty2.jpg"
          alt="Beauty ritual"
          width={600}
          height={800}
          className="rounded-2xl shadow-lg object-cover"
        />
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Since 2018 – For Generations Ahead
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our story is one of devotion to self-care—where beauty meets wellness. We believe cosmetics should be more than just products; they should inspire confidence, celebrate individuality, and nurture your skin, hair, and body with kindness. From everyday essentials to indulgent treats, every item we offer is thoughtfully chosen to enhance your natural beauty while caring for your well-being. At our core, we are committed to bringing you high-quality, affordable products that empower you to look good, feel good, and glow from the inside out.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
          Moments of Beauty
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="./images/beauty3.jpg"
            alt="Gallery 1"
            width={500}
            height={600}
            className="rounded-xl shadow-md object-cover"
          />
          <img
            src="./images/beauty4.jpg"
            alt="Gallery 2"
            width={500}
            height={600}
            className="rounded-xl shadow-md object-cover"
          />
          <img
            src="./images/beauty5.jpg"
            alt="Gallery 3"
            width={500}
            height={600}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
  Our Philosophy
</h2>
<p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
  We believe beauty is more than skin deep—it’s a reflection of self-love, confidence, 
  and care. Our motto,{" "}
  <span className="italic font-semibold">
    “Glow with Grace, Live with Purpose,”
  </span>{" "}
  reminds us that every product should not only enhance your natural radiance but also 
  honor the planet. That’s why we’re committed to sustainable choices, ethical sourcing, 
  and creating beauty that feels as good as it looks.
</p>

        </div>
      </section>
    </div>
  );
}
