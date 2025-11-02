import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const EditorComp = () => {
  const [html, setHtml] = useState("<h1>Hello World!</h1>");
  const [css, setCss] = useState("h1 { color: red; text-align: center; }");
  const [js, setJs] = useState("console.log('Hello from JS!');");
  const [language, setLanguage] = useState("html");
  const iframeRef = useRef(null);

  const runCode = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const source = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (err) {
                document.body.innerHTML += '<pre style="color:red;">Error: ' + err.message + '</pre>';
              }
            </script>
          </body>
        </html>
      `;
      iframe.srcdoc = source;
    }
  };

  // Choose which editor’s code to display
  const getCode = () => {
    if (language === "html") return html;
    if (language === "css") return css;
    if (language === "javascript") return js;
  };

  // Handle editor change
  const handleCodeChange = (value) => {
    if (language === "html") setHtml(value || "");
    if (language === "css") setCss(value || "");
    if (language === "javascript") setJs(value || "");
  };

  return (
    <div className="w-full h-screen bg-[#1e1e1e] flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h2 className="text-white text-lg font-semibold">HTML • CSS • JS Editor</h2>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 outline-none"
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <button
          onClick={runCode}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ▶ Run Code
        </button>
      </div>

      {/* Editor + Output side-by-side */}
      <div className="flex-1 flex gap-4">
        {/* Editor */}
        <div className="w-2/3 h-full border border-gray-700 rounded">
          <Editor
            height="100%"
            width="100%"
            language={language}
            theme="vs-dark"
            value={getCode()}
            onChange={handleCodeChange}
          />
        </div>

        {/* Output */}
        <div className="w-1/3 bg-black text-green-400 p-4 rounded border border-gray-700 overflow-auto">
          <h3 className="text-white font-semibold mb-2">Live Preview:</h3>
          <iframe
            ref={iframeRef}
            title="output"
            className="w-full h-[85%] bg-white rounded"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EditorComp;
