import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  labels: { type: [String], default: [] },
  description: { type: String, required: true },
  duedate: {
    type: Date, validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: "Due date cannot be in the past",
    },
  },
  status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  priority: { type: String, required: true, enum: ["Low", "Medium", "High"], default: "High" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema)
export default Task

