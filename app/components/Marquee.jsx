// components/Marquee.js
"use client";

import React from "react";

const Marquee = () => {
  const messages = [
    "🚨 LIMITED TIME OFFER: BEAUTY SALE YOU CAN'T RESIST",
    "🚚 FREE SHIPPING AND RETURNS",
    "✨ NEW SEASON, NEW STYLES: BEAUTY SALE YOU CAN'T MISS",
    "🚨 LIMITED TIME OFFER: BEAUTY SALE YOU CAN'T RESIST",
    "🚚 FREE SHIPPING AND RETURNS",
  ];

  return (
    <div className="relative overflow-hidden bg-neutral-200 text-black py-3">
      <div className="flex whitespace-nowrap marquee">
        {messages.map((msg, index) => (
          <span key={index} className="mx-8 font-semibold">
            {msg}
          </span>
        ))}
        {/* Duplicate for seamless scroll */}
        {messages.map((msg, index) => (
          <span key={`duplicate-${index}`} className="mx-8 font-semibold">
            {msg}
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
