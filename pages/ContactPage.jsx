import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footercomponent";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function InfoCard({ icon, title, info }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center bg-[#1b1b1b]/60 backdrop-blur-xl p-6 rounded-2xl 
                 border border-white/10 hover:border-green-500/50 hover:shadow-[0_0_25px_#22c55e55] 
                 transition-all cursor-pointer text-center"
    >
      <div className="text-green-400 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{info}</p>
    </motion.div>
  );
}

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#0f0f0f] to-[#1e1e1e] text-white">
      <Navbar />

      <main className="grow px-6 py-20 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Have a question, feedback, or want to collaborate? Reach out to us through the form or any of the options below.
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <InfoCard
            icon={<FaEnvelope />}
            title="Email"
            info="abdusalam0381@gmail.com"
          />
          <InfoCard
            icon={<FaPhone />}
            title="Phone"
            info="+92 312 459-7594"
          />
          <InfoCard
            icon={<FaMapMarkerAlt />}
            title="Address"
            info="Street #4, Academy Road , Cantt , Lahore"
          />
        </div>

        {/* Contact Form */}
       {/* Contact Form */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="bg-linear-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl 
             shadow-2xl border border-gray-700/50 max-w-md mx-auto w-full"
>
  <div className="text-center mb-6">
    <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
      Send Us a Message
    </h2>
    <p className="text-gray-400 text-sm">
      We'll get back to you as soon as possible
    </p>
  </div>

  <form className="space-y-5">
    <div className="space-y-3">
      <label className="text-gray-300 block mb-3 font-bold text-xs uppercase tracking-wide" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        className="w-full bg-gray-900/60 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white 
                   placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 
                   focus:ring-2 focus:ring-emerald-500/20 transition-all"
      />
    </div>

    <div className="space-y-1.5">
      <label className="text-gray-300 block mb-3 text-xs font-bold uppercase tracking-wide" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="w-full bg-gray-900/60 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white 
                   placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 
                   focus:ring-2 focus:ring-emerald-500/20 transition-all"
      />
    </div>

    <div className="space-y-1.5">
      <label className="text-gray-300 block mb-3 text-xs font-bold uppercase tracking-wide" htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        placeholder="How can we help you?"
        rows={4}
        className="w-full bg-gray-900/60 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white 
                   placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 
                   focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-medium py-3 
                 rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-900/20 transition-all 
                 duration-300 text-sm hover:from-emerald-700 hover:to-emerald-800"
    >
      Send Message
    </motion.button>
  </form>
</motion.div>

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
