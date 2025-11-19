import mongoose from "mongoose";

const PublicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  html: { type: String },
  css: { type: String },
  js: { type: String },
});

const PublicModel = mongoose.model("Project", PublicSchema);
export default PublicModel;
