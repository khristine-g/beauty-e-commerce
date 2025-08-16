"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-pink-100 via-white to-white">
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
            Innovative formulas that transform skincare into an art form—bringing
            out your most luminous and authentic beauty.
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
            Our journey started with a simple vision: skincare crafted with
            purpose. What began with essentials for the face and body soon grew
            into sun protection, hair care, and a holistic line of beauty
            rituals. Each step guided by the desire to harmonize efficacy with
            self-care.
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
            Since 2010 – For Generations Ahead
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our story is one of devotion to balance—where sustainability meets
            indulgence. We believe beauty should be powerful yet responsible,
            transformative yet kind. Every product we create is crafted to leave
            a legacy of both confidence and care for the planet.
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
            Beauty is more than skin deep. It’s about embracing your glow while
            doing good for the world. That’s why our motto is{" "}
            <span className="italic font-semibold">
              “Glow with Grace, Live with Purpose.”
            </span>{" "}
            Every purchase not only enhances your natural beauty but also fuels
            our commitment to sustainable practices and ethical sourcing.
          </p>
        </div>
      </section>
    </div>
  );
}
