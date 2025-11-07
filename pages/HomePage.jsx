import { Navbar } from "../components/Navbar";

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-[#242424] p-6 rounded-xl border border-gray-700 hover:border-green-500 hover:shadow-[0_0_12px_#22c55e55] transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-between px-6 pt-20">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Build, Run, and Share Code Instantly
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mb-8 leading-relaxed">
            A powerful online HTML, CSS, and JavaScript playground for developers.
          </p>

          <button
            onClick={() => window.location.href = "/editor"}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white text-lg font-medium transition-all hover:shadow-[0_0_20px_#22c55e55]"
          >
            🚀 Start Coding
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 mb-16">
          <FeatureCard
            title="Live Preview"
            desc="Instantly see your code output in real-time as you type."
          />
          <FeatureCard
            title="Dark Theme"
            desc="Code comfortably with our sleek, modern dark interface."
          />
          <FeatureCard
            title="Multiple Languages"
            desc="Switch easily between HTML, CSS, and JavaScript editors."
          />
        </div>

        {/* Footer */}
        <footer className="text-gray-500 text-sm py-6 border-t border-gray-700 w-full text-center">
          © {new Date().getFullYear()} CodePlayground. All rights reserved.
        </footer>

      </div>
    </>
  );
}
