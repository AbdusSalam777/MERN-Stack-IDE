import express from "express";
const router = express.Router();
import UserModel from "../models/UserProjectsModel.js";
import PublicModel from "../models/PublicProjectsModel.js";

// Create new user project
router.post("/userProject", async (req, res) => {
  try {
    const project = await UserModel.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving project" });
  }
});

// Get projects for a specific user
router.get("/userProject/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await UserModel.find({ owner: userId });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user projects" });
  }
});

// Get all public projects
router.get("/getprojects", async (req, res) => {
  try {
    const data = await PublicModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Get single project by ID (user or public)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let project = await UserModel.findById(id);
    if (!project) {
      project = await PublicModel.findById(id);
    }
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching project" });
  }
});

// Update user project
router.put("/:id", async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating project" });
  }
});

// Delete user project
router.delete("/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting project" });
  }
});

export default router;
