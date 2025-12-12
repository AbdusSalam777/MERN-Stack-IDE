import { FaComments } from "react-icons/fa";
const PreFooter = () => (
  <section className="bg-[#2a2a2a] text-white py-20 px-6 text-center rounded-t-3xl mt-12">
    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
      <FaComments className="text-blue-400" /> Dive Deeper
    </h2>
    <p className="mb-6 max-w-3xl mx-auto text-gray-300">
      Explore nodes, children, and parent connections in a structured visual tree. Perfect for learning, debugging, or understanding hierarchies.
    </p>
    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition">
      Learn More
    </button>
  </section>
);

export default PreFooter;