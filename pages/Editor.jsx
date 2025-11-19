import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { IoPlayOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";

const EditorComp = () => {
  const { id } = useParams();
  const { user, isSignedIn, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const iframeRef = useRef(null);

  const [language, setLanguage] = useState("html");
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1{color:red}");
  const [js, setJs] = useState("console.log('Hello')");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) setUserId(user.id);
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (id) {
      async function loadProject() {
        const res = await fetch(`http://localhost:3000/projects/${id}`);
        const data = await res.json();
        setHtml(data.html || "");
        setCss(data.css || "");
        setJs(data.js || "");
        setTitle(data.title || "");
        setDescription(data.description || "");
      }
      loadProject();
    }
  }, [id]);

  const runCode = () => {
    iframeRef.current.srcdoc = `<html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
  };

  const SaveProjectToDB = async () => {
    if (!userId) { alert("⚠️ User not loaded yet"); return; }

    const data = { title, description, html, css, js, owner: userId };

    await fetch("http://localhost:3000/projects/userProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setShowPopup(false);
    alert("✅ Project Saved Successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-[#1e1e1e] flex flex-col p-4">
        <div className="flex justify-between items-center mb-2">
          <select onChange={(e) => setLanguage(e.target.value)} className="bg-[#1f1f1f] border border-gray-600 text-white px-3 py-2 rounded-md">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>

          <div className="flex items-center gap-4">
            <IoPlayOutline onClick={runCode} className="text-white text-3xl cursor-pointer hover:text-green-400 transition"/>
            <Button onClick={() => setShowPopup(true)} className="text-white px-4 py-2 rounded-md bg-green-600 hover:bg-green-700">
              {id ? "Update Project" : "Save Project"}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex gap-4">
          <div className="w-2/3 border border-gray-700 rounded">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={language === "html" ? html : language === "css" ? css : js}
              onChange={(value) => {
                if (language === "html") setHtml(value || "");
                if (language === "css") setCss(value || "");
                if (language === "javascript") setJs(value || "");
              }}
            />
          </div>

          <div className="w-1/3 bg-black p-4 rounded border border-gray-700">
            <iframe ref={iframeRef} className="w-full h-full bg-white" title="preview" />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#242424] p-6 rounded-xl w-[350px] border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">{id ? "Update Project" : "Save Project"}</h2>
            <input placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-3 p-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"/>
            <textarea placeholder="Short Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-4 p-2 rounded bg-[#1e1e1e] border border-gray-600 text-white h-24"/>
            <div className="flex justify-between">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
              <button onClick={SaveProjectToDB} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white">{id ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorComp;
