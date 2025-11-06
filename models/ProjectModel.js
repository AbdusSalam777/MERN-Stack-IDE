import mongoose, { Model } from "mongoose";

const ProjectSchema=new mongoose.Schema({
    html:"string",
    css:"string",
    js:"string"
})

const ProjectModel = mongoose.model("Project",ProjectSchema);

export default ProjectModel;