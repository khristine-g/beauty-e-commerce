"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Sales() {
  const router = useRouter();

  const calculateTimeLeft = () => {
    const endTime = new Date("2025-09-11T00:00:00");
    const now = new Date();
    const difference = endTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleViewAll = () => {
    router.push("/all-products");
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center bg-white overflow-hidden py-14 md:py-20">
      {/* Background Image */}
      <motion.div
        className="w-full md:w-1/2 h-64 md:h-[500px] bg-cover bg-center rounded-xl shadow-md"
        style={{
          backgroundImage: "url('./images/beauty1.jpg')",
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Content */}
      <motion.div
        className="w-full md:w-1/2 px-8 py-10 md:py-0 text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          variants={itemVariants}
        >
          Up to <span className="text-pink-600">60% Off</span>
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl font-medium text-gray-700 mt-3"
          variants={itemVariants}
        >
          End of Season Sale
        </motion.h2>

        {/* Countdown */}
        <motion.div
          className="flex justify-center md:justify-start gap-4 mt-8"
          variants={itemVariants}
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((unit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-4 w-20 text-center shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span className="block text-2xl md:text-3xl font-bold text-gray-900">
                {unit.value}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 text-gray-600 max-w-md leading-relaxed mx-auto md:mx-0"
          variants={itemVariants}
        >
          Don’t miss out on our biggest deals of the year. Grab your favorite
          products while stocks last!
        </motion.p>

        <motion.button
          onClick={handleViewAll}
          className="mt-8 px-8 py-3 text-lg font-semibold bg-gray-950 text-white rounded-xl shadow-md hover:bg-pink-700 hover:shadow-lg transition-all"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>
    </section>
  );
}
