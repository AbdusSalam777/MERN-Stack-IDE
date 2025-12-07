import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { FaReact, FaPaintBrush, FaLock } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white">
      <Navbar />
      <main className="grow max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-green-400 drop-shadow-lg">
            Welcome to Code IDE
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            A modern platform to create, manage, and showcase your projects. Organize your ideas, collaborate, and keep your work secure—all in one place.
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-block px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Explore Projects
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 text-center mb-16">
          <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
            <FaReact className="text-green-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Built with React</h3>
            <p className="text-gray-400">
              React ensures a fast and dynamic UI. Modern design meets smooth functionality.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
            <FaPaintBrush className="text-green-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Sleek Design</h3>
            <p className="text-gray-400">
              TailwindCSS allows a beautiful, responsive layout with minimal effort and maximum impact.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
            <FaLock className="text-green-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">
              Projects are stored securely, giving you full control to edit, update, or delete anytime.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1a1a1a] p-12 rounded-xl text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
            Ready to start your next project?
          </h2>
          <p className="text-gray-300 mb-6">
            Join thousands of creators and take your ideas to the next level. Simple, modern, and secure.
          </p>
          <Link
            to="/projects"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
