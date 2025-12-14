import express from "express";
import { requestStack } from "../middlewares/requestStack.js";

const router = express.Router();

// Latest requests
router.get("/", (req, res) => {
  try {
    const all = requestStack.getAll().reverse(); // ✅ use getAll()
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Undo last request
router.post("/undo", (req, res) => {
  try {
    if (requestStack.size() === 0) return res.send("Nothing to undo");
    const last = requestStack.pop();
    res.json({ removed: last });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Clear history
router.post("/clear", (req, res) => {
  try {
    requestStack.clear();
    res.send("History cleared");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
