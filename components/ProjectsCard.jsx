import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const ProjectsCard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [projects, setProjects] = useState({ user: [], public: [] });
  const [showPopup, setShowPopup] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    async function fetchProjects() {
      try {
        const publicRes = await fetch("http://localhost:3000/projects/getprojects");
        const publicData = await publicRes.json();

        let userData = [];
        if (isSignedIn && user) {
          const userRes = await fetch(`http://localhost:3000/projects/userProject/${user.id}`);
          userData = await userRes.json();
        }

        setProjects({ public: publicData, user: userData });
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, [isLoaded, isSignedIn, user]);

  const openEditPopup = (project) => {
    setEditProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setShowPopup(true);
  };

  const updateProject = async () => {
    await fetch(`http://localhost:3000/projects/${editProject._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setProjects((prev) => ({
      ...prev,
      user: prev.user.map((p) => (p._id === editProject._id ? { ...p, title, description } : p)),
    }));

    setShowPopup(false);
    setEditProject(null);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    await fetch(`http://localhost:3000/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => ({ ...prev, user: prev.user.filter((p) => p._id !== id) }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-white mb-6">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.user.map((p) => (
          <div key={p._id} className="bg-[#242424] p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:shadow-[0_0_12px_#22c55e55] transition-all duration-300">
            <Link to={`/editor/${p._id}`}>
              <h3 className="text-xl font-semibold text-green-400 mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{p.description}</p>
            </Link>

            {isSignedIn && user && p.owner === user.id && (
              <div className="flex justify-between mt-3">
                <button onClick={() => openEditPopup(p)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white">Edit</button>
                <button onClick={() => deleteProject(p._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Delete</button>
              </div>
            )}
          </div>
        ))}

        {projects.public.map((p) => (
          <div key={p._id} className="bg-[#242424] p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:shadow-[0_0_12px_#22c55e55] transition-all duration-300">
            <Link to={`/editor/${p._id}`}>
              <h3 className="text-xl font-semibold text-green-400 mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{p.description}</p>
            </Link>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#242424] p-6 rounded-xl w-[350px] border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Edit Project</h2>
            <input placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-3 p-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"/>
            <textarea placeholder="Short Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-4 p-2 rounded bg-[#1e1e1e] border border-gray-600 text-white h-24"/>
            <div className="flex justify-between">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
              <button onClick={updateProject} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
