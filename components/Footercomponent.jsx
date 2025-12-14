import React from "react";
import { FaGithub, FaEnvelope, FaAddressCard } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left side: copyright */}
        <p className="text-sm sm:text-base text-gray-300">
          &copy; {new Date().getFullYear()} Code IDE. All rights reserved.
        </p>

        {/* Right side: links */}
        <div className="flex gap-6 mt-4 sm:mt-0 items-center">
          <a
            href="/about"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaAddressCard className="text-lg" /> About
          </a>
          <a
            href="https://github.com/AbdusSalam777/MERN-Stack-IDE/tree/main"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaGithub className="text-lg" /> GitHub
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaEnvelope className="text-lg" /> Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
