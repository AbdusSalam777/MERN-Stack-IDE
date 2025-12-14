import { Navbar } from "../components/Navbar";
import { CTA } from "../components/CTA";
import { motion } from "framer-motion";
import { BsTerminal } from "react-icons/bs";
import Featurecard from "../components/featurecard";

import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
} from "react-icons/si";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-b from-[#0b0b0b] via-[#121212] to-[#1a1a1a] text-white">
        {/* HERO SECTION */}
        <section className="pt-36 px-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-center"
          >
            <h1
              className="text-5xl md:text-7xl font-extrabold leading-tight
                           bg-linear-to-r from-green-400 via-emerald-300 to-lime-200
                           bg-clip-text text-transparent drop-shadow-xl"
            >
              Code Faster. <br /> Preview Instantly.
            </h1>

            <p className="mt-8 text-gray-400 text-lg md:text-xl leading-relaxed">
              A powerful online playground for HTML, CSS & JavaScript. Write
              code, see results live, and share instantly.
            </p>

            <div className="mt-14 flex justify-center gap-6 flex-wrap">
              <motion.button
                onClick={() => (window.location.href = "/editor")}
                className="px-10 py-4 rounded-2xl bg-green-500 text-black font-semibold hover:bg-black hover:text-white active:scale-95 transition-ease duration-200 "
              >
                <BsTerminal className="text-xl inline-block mr-2 mb-1" />
                <span>Start Coding</span>
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* BUILT WITH SECTION */}
        <section className="mt-40 px-6 flex justify-center">
          <div className="max-w-[1200px] w-full">
            <h2 className="text-center text-4xl font-bold mb-6">
              Built With Modern Tech
            </h2>
            <p className="text-center text-gray-400 mb-16">
              Crafted using powerful, scalable & modern technologies
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
              <Featurecard
                Icon={SiReact}
                title="React"
                desc="Component-based frontend"
                color="text-cyan-400"
              />
              <Featurecard
                title="Node.js"
                desc="High-performance backend"
                Icon={SiNodedotjs}
                color="text-green-500"
              />
              <Featurecard
                title="Express"
                desc="Minimal & fast API framework"
                Icon={SiExpress}
                color="text-gray-300"
              />
              <Featurecard
                title="MongoDB"
                desc="NoSQL database for scalable apps"
                Icon={SiMongodb}
                color="text-emerald-400"
                glow="rgba(16,185,129,0.6)"
              />
              <Featurecard
                title="Tailwind CSS"
                desc="Utility-first modern styling"
                Icon={SiTailwindcss}
                color="text-sky-400"
              />
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="mt-40 px-6 pb-32">
          <CTA />
        </section>
      </div>
    </>
  );
}
