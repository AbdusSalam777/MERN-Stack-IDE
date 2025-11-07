import { IoPlayOutline } from "react-icons/io5";
import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { useParams } from "react-router-dom";

const EditorComp = () => {
  const { id } = useParams(); 
  const iframeRef = useRef(null);

  const [language, setLanguage] = useState("html");
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1{color:red}");
  const [js, setJs] = useState("console.log('Hello from JS')");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // LOAD PROJECT IF EDIT MODE
  useEffect(() => {
    if (id) {
      async function loadProject() {
        const res = await fetch(`http://localhost:3000/projects/${id}`);
        const data = await res.json();
        setHtml(data.html);
        setCss(data.css);
        setJs(data.js);
        setTitle(data.title);
        setDescription(data.description);
      }
      loadProject();
    }
  }, [id]);

  const runCode = () => {
    const iframe = iframeRef.current;
    const source = `
      <html>
        <head><style>${css}</style></head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    iframe.srcdoc = source;
  };

  const getCode = () =>
    language === "html" ? html : language === "css" ? css : js;

  const handleCodeChange = (value) => {
    if (language === "html") setHtml(value || "");
    if (language === "css") setCss(value || "");
    if (language === "javascript") setJs(value || "");
  };

  async function SaveProjectToDB() {
    const payload = { title, description, html, css, js };

    const url = id
      ? `http://localhost:3000/projects/${id}`
      : `http://localhost:3000/projects`;

    const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setShowPopup(false);
    alert(id ? "✅ Project Updated!" : "✅ Project Saved Successfully!");
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-[#1e1e1e] flex flex-col p-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <select
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#1f1f1f] border border-gray-600 text-white px-3 py-2 rounded-md"
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>

          <div className="flex items-center gap-4">
            <IoPlayOutline
              onClick={runCode}
              className="text-white text-3xl cursor-pointer hover:text-green-400 transition"
            />
            <Button
              variant="secondary"
              onClick={() => setShowPopup(true)}
              className="text-white px-4 py-2 rounded-md bg-green-600 hover:bg-green-700"
            >
              {id ? "Update Project" : "Save Project"}
            </Button>
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="flex-1 flex gap-4">
          <div className="w-2/3 border border-gray-700 rounded">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={getCode()}
              onChange={handleCodeChange}
            />
          </div>

          <div className="w-1/3 bg-black p-4 rounded border border-gray-700">
            <iframe ref={iframeRef} className="w-full h-full bg-white" title="preview" />
          </div>
        </div>
      </div>

      {/* Save / Update Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#242424] p-6 rounded-xl w-[350px] border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {id ? "Update Project" : "Save Project"}
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
                onClick={SaveProjectToDB}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                {id ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorComp;
