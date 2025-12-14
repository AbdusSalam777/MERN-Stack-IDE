import React, { useState, useEffect } from "react";
import {Navbar} from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

function RequestHistory() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:3000/req-history");
      const data = await res.json();
      // Reverse to show latest on top
      setHistory(data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const undoLast = async () => {
    await fetch("http://localhost:3000/req-history/undo", { method: "POST" });
    fetchHistory();
  };

  const clearHistory = async () => {
    await fetch("http://localhost:3000/req-history/clear", { method: "POST" });
    fetchHistory();
  };

  // Color for method badges
  const methodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-green-500";
      case "POST":
        return "bg-blue-500";
      case "PUT":
        return "bg-yellow-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-[#0d0d0d] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">📜 Request History</h2>
          <div className="flex gap-3">
            <button
              onClick={undoLast}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded active:scale-95 duration-200"
            >
              Undo Last
            </button>
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded active:scale-95 duration-200"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Request log */}
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No requests yet.</p>
          ) : (
            <ul className="flex flex-col space-y-2">
              <AnimatePresence initial={false}>
                {history.map((req, index) => (
                  <motion.li
                    key={req.time + index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between px-4 py-2 rounded hover:bg-[#1a1a1a] transition-colors duration-200"
                  >
                    {/* Method badge */}
                    <span
                      className={`text-xs font-bold text-white px-2 py-1 rounded ${methodColor(
                        req.method
                      )}`}
                    >
                      {req.method}
                    </span>

                    {/* Route */}
                    <span className="text-gray-300 flex-1 mx-4 break-all">
                      {req.path}
                    </span>

                    {/* Time */}
                    <span className="text-gray-500 text-xs">
                      {new Date(req.time).toLocaleTimeString()}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default RequestHistory;
