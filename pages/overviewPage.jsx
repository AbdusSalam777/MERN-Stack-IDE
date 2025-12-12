// Overview.jsx
import React from "react";
import { Navbar } from "../components/Navbar";       
import { Footer } from "../components/Footercomponent"; 
import { FaLightbulb } from "react-icons/fa";
import AVLTree from "../../DSA/BST";
import HeroSection from "../components/Hero_overview";
import PreFooter from "../components/Prefooter_overview";

// Recursive AVL Tree Node Component
const CommentNodeAVL = ({ node }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center relative mt-12"> 
      {/* Node box - fixed width and height */}
      <div className="p-4 border border-gray-600 rounded-2xl bg-[#1e1e1e] text-white text-center w-[220px] h-[120px] shadow-lg z-10 relative flex flex-col justify-center ">
        <strong className="text-blue-400 text-lg">{node.data.user}</strong>
        <p className="mt-2 text-sm text-gray-300">{node.data.text}</p>
      </div>

{(node.left || node.right) && (
  <div className="flex justify-between w-full mt-12 relative gap-x-14">

    {/* Left child */}
    <div className="flex-1 flex justify-center relative">

      {node.left && (
        <>
          {/* Horizontal Line */}
          <div className="absolute top-0 left-1/2 w-1/2 h-[2px] bg-gray-500"></div>

          {/* Vertical Line */}
          <div className="absolute top-0 left-1/2 h-12 w-[2px] bg-gray-500"></div>
        </>
      )}

      <CommentNodeAVL node={node.left} />
    </div>

    {/* Right child */}
    <div className="flex-1 flex justify-center relative">

      {node.right && (
        <>
          {/* Horizontal Line */}
          <div className="absolute top-0 right-1/2 w-1/2 h-[2px] bg-gray-500"></div>

          {/* Vertical Line */}
          <div className="absolute top-0 right-1/2 h-12 w-[2px] bg-gray-500"></div>
        </>
      )}

      <CommentNodeAVL node={node.right} />
    </div>
  </div>
)}

    </div>
  );
};

// Full Page Component
const OverviewPage = () => {

const tasksData = [
  { key: 6, id: 1, user: "Project Setup", text: "Initialize repo and install dependencies" },
  { key: 3, id: 2, user: "Backend", text: "Setup API endpoints" },
  { key: 9, id: 3, user: "Frontend", text: "Create login form and validation" },
  { key: 2, id: 4, user: "Database", text: "Design schemas and stores data in database" },
  { key: 4, id: 5, user: "Authentication", text: "Integrate JWT-based login in backend" },
  { key: 1, id: 6, user: "Config", text: "Setup ESLint and Prettier" },
  { key: 5, id: 7, user: "Testing", text: "Write unit tests for login API" },
  { key: 8, id: 8, user: "Styling", text: "Add TailwindCSS to project" },
  { key: 10, id: 9, user: "Deployment", text: "Setup staging environment" },
  { key: 7, id: 10, user: "CI/CD", text: "Configure GitHub Actions pipeline" },
  { key: 11, id: 11, user: "Monitoring", text: "Setup error tracking and logs" },
];

  const tree = new AVLTree();
  tasksData.forEach(c => tree.insert(c));

  return (
    <div className="bg-[#1e1e1e] flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />

      <main className="flex-1 w-full px-6 py-10 max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <FaLightbulb className="text-yellow-400" /> AVL Tree Layout
        </h1>

        <div className="w-full overflow-x-auto relative">
          <CommentNodeAVL node={tree.root} />
        </div>
      </main>

      <PreFooter />
      <Footer />
    </div>
  );
};

export default OverviewPage;
