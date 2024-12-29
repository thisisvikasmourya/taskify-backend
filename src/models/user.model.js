import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    termsAccepted: { type: Boolean, required: true },
    description:{type:String},
    designation:{type:String},
    address:{type:String},
    website:{type:String}
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User