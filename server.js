import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import CourseRoutes from "./routes/ProjectRoutes.js";
import requestTracker from "./middlewares/requestStack.js";
import requestRoutes from "./routes/requestHistory.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(requestTracker);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

app.use("/projects", CourseRoutes);
app.use("/req-history", requestRoutes);

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
