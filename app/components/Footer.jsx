"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiMapPinLine } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-200 text-black pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-black">True Beauty</h3>
          <p className="mt-3 text-sm leading-6">
            Your one-stop shop for all things beauty.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { icon: FaFacebookF, href: "https://facebook.com" },
              { icon: FaTwitter, href: "https://twitter.com" },
              { icon: FaInstagram, href: "https://instagram.com" },
              { icon: FaLinkedin, href: "https://linkedin.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-colors"
              >
                <Icon className="text-white text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            {[
              { name: "About Us", href: "/about-us" },
              { name: "Our Story", href: "/our-story" },
              { name: "Visit Our Store", href: "/visit-store" },
              { name: "Contact Us", href: "/contact-us" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-pink-500 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Help", href: "/help" },
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Returns & Exchanges", href: "/returns-exchanges" },
              { name: "Shipping", href: "/shipping" },
              { name: "Terms & Conditions", href: "/terms-conditions" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-pink-500 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MdPhone className="text-pink-500" /> (212) 555-1234
            </li>
            <li className="flex items-center gap-2">
              <IoMdMail className="text-pink-500" /> info@truebeautyshop.com
            </li>
            <li className="flex items-start gap-2">
              <RiMapPinLine className="text-pink-500 mt-1" /> 
              1234 Beauty Street, Nairobi, NB 10001
            </li>
          </ul>
          <Link
            href="/get-direction"
            className="mt-3 inline-block text-sm text-pink-500 hover:underline"
          >
            Get Directions
          </Link>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3">Stay Updated</h4>
          <p className="text-sm leading-6">
            Subscribe to receive the latest beauty tips & offers.
          </p>
          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 text-l rounded-l-md w-40 bg-white border border-gray-700 text-black focus:outline-none focus:border-pink-500"
            />
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-r-md text-sm font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} True Beauty. All Rights Reserved.
      </div>
    </footer>
  );
}
