import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  html: { type: String },
  css: { type: String },
  js: { type: String },
  owner: { type: String, required: true },
});

const UserModel = mongoose.model("UserProject", UserSchema);
export default UserModel;
