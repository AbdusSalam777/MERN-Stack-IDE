import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProjectsCard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function GetProjects() {
      try {
        const res = await fetch("http://localhost:3000/projects/getprojects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    }
    GetProjects();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-white mb-6">Saved Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Link to={`/editor/${p._id}`} key={p._id}>
            <div className="bg-[#242424] p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:shadow-[0_0_12px_#22c55e55] transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold text-green-400 mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
