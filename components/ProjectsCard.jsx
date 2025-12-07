import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import mergeSortAsc from "../../Sorting/MergeSort";
import bubbleSortDesc from "../../Sorting/BubbleSort";
import LinkedList from "../../DSA/linkedlists";

export const ProjectsCard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [projects, setProjects] = useState([]);
  const [linkedList] = useState(new LinkedList());
  const [showPopup, setShowPopup] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch projects
  useEffect(() => {
    if (!isLoaded) return;

    const fetchProjects = async () => {
      const publicRes = await fetch(
        "http://localhost:3000/projects/getprojects"
      );
      const publicData = await publicRes.json();

      let userData = [];
      if (isSignedIn && user) {
        const userRes = await fetch(
          `http://localhost:3000/projects/userProject/${user.id}`
        );
        userData = await userRes.json();
      }

      const all = [...userData, ...publicData];

      // insert all database documents in linked lists
      all.forEach((p) => linkedList.insert(p));

      // convert linked list to array for React state
      setProjects(linkedList.toArray());
    };

    fetchProjects();
  }, [isLoaded, isSignedIn, user]);

  // Sorting functions
  const sortAsc = () => {
    console.log(
      "Before ASC:",
      projects.map((p) => p.title)
    );
    const sorted = mergeSortAsc([...projects]);
    console.log(
      "After ASC:",
      sorted.map((p) => p.title)
    );

    setProjects(sorted);
  };

  const sortDesc = () => {
    console.log(
      "Before DESC:",
      projects.map((p) => p.title)
    );
    const sorted = bubbleSortDesc([...projects]);
    console.log(
      "After DESC:",
      sorted.map((p) => p.title)
    );

    setProjects(sorted);
  };

  // Edit popup
  const openEditPopup = (project) => {
    setEditProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setShowPopup(true);
  };

  const updateProject = async () => {
    if (!editProject) return;

    // 1. Update DB
    await fetch(`http://localhost:3000/projects/${editProject._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    // 2. Update LinkedList node (DSA)
    linkedList.update(editProject._id, { title, description });

    // 3. UI refresh
    setProjects(linkedList.toArray());

    setShowPopup(false);
    setEditProject(null);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    // 1. DELETE FROM DATABASE
    await fetch(`http://localhost:3000/projects/${id}`, {
      method: "DELETE",
    });

    // 2. DELETE FROM LINKED LIST (DSA)
    linkedList.remove(id);

    // 3. UPDATE REACT STATE (UI REFRESH)
    setProjects(linkedList.toArray());
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">My Projects</h2>

        <div className="flex gap-3">
          <button
            onClick={sortAsc}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Sort A → Z
          </button>

          <button
            onClick={sortDesc}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Sort Z → A
          </button>
        </div>
      </div>

      {/* Render Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p._id} // <-- use unique ID instead of index
            className="bg-[#242424] p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:shadow-[0_0_12px_#22c55e55] transition-all duration-300"
          >
            <Link to={`/editor/${p._id}`}>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                {p.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{p.description}</p>
            </Link>

            {isSignedIn && user && p.owner === user.id && (
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => openEditPopup(p)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(p._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#242424] p-6 rounded-xl w-[350px] border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Edit Project
            </h2>

            <input
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"
            />

            <textarea
              placeholder="Short Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 p-2 rounded bg-[#1e1e1e] border border-gray-600 text-white h-24"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancel
              </button>

              <button
                onClick={updateProject}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
