import { FaCode, FaComments, FaLightbulb } from "react-icons/fa";
const HeroSection = () => (
  <section className="bg-linear-to-r from-purple-800 to-black text-white py-24 px-6 text-center rounded-b-3xl">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
        <FaCode className="text-green-400" /> Project Workflow Overview
      </h1>
      <p className="text-xl mb-6">
        Visualize your project tasks and dependencies in a structured tree. See how each step connects to the next and track progress efficiently.
      </p>
      <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-lg transition">
        Explore the Workflow
      </button>
    </div>
  </section>
);

export default HeroSection;