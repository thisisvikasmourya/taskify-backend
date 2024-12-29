import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    project_name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema)
export default Project