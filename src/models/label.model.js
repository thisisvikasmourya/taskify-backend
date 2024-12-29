import mongoose, { Schema } from "mongoose";

const labelSchema = new Schema({
    label_name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

const Label = mongoose.model("Label", labelSchema)
export default Label