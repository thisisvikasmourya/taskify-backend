import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

    const { name, email, phoneNumber, password,termsAccepted } = req.body
    console.log(req,"thisis")
    try {
        if (!name || !email ||!termsAccepted || !password) {
           return res.status(400).json({ status:false,message: "All fields are required" })
        }
        const userExist = await User.findOne({ email, phoneNumber })
        if (userExist) {
          return  res.status(400).json({status:false, message: "User already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, phoneNumber, email, password: hashPassword,termsAccepted
        })
        const users = await user.save()

        const userResponse = {
            id: users._id,
            name: users.name,
            email: users.email,
            phoneNumber: users.phoneNumber
        }
        return res.status(201).json({status:true, message: "User created successfully", userResponse })
    } catch (error) {
        return res.status(500).json({ status:false,message: error })
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body
    try {
        if (!email || !password) {
          return  res.status(400).json({ status:false,message: "All fields are required" })
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return  res.status(400).json({ status:false,message: "User not found" })
        }
        const isValidPassword = await bcrypt.compare(password,userExist.password)
        if (!isValidPassword) {
            return res.status(401).json({ status:false,message: "Invalid email and Password" })
        }
        // const users = await user.save()

        const token = jwt.sign({
            id: userExist._id,
            email: userExist.email
        }, process.env.SECRET_TOKEN, {
            expiresIn: "7d"
        })

        return res.status(200).json({status:true, message: "User Logged in successfully" ,token})
    } catch (error) {
        return res.status(500).json({status:false, message: error.message })
    }
}

export const getProfile = async(req,res)=>{
    const userId = req.user.id
   try {
     if(!userId){
         return res.status(400).json({status:false,message:"User not found"})
     }
     const user = await User.findById(userId).select('-password')
     if(!user){
         return res.status(400).json({status:false,message:"User not found"})
     }
     return res.status(200).json({status:true,message:"User Profile ",user})
   } catch (error) {
    return res.status(500).json({status:false,message:error.message})
    
   }
}

export const getAllUserList = async (req, res) => {
    console.log(req)
    try {
        console.log("thisis")
        const projects = await User.find()
        console.log(projects)
        const projectList = projects.map(list=>({
            id:list._id,
            name:list.name
        }))
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: projectList

        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProfile =async(req,res)=>{
    const  userId =  req.params
    const data  = req.body
    try {
        if(!userId){
            return res.status(400).json({message:"User Id is required"})
        }
        if(!data){
            return res.status(400).json({message:"Data not found"})
        }
        console.log(userId,data,"yyyy")
        const updatedUser = await User.findByIdAndUpdate(userId.id,data)
        console.log(updatedUser,"yyy555y")
        if(!updatedUser){
            return res.status(400).json({message:"Something went Wrong"})
        }
        return res.status(200).json({status:true,message:"User updated sucessfully"})
    } catch (error) {
        return res.status(500).json({message:"User not updated"})
        
    }
}


export const changePassword = async(req,res)=>{
    const userId = req.user.id
    const {password,newPassword} = req.body
    try {
        if(!userId){
            return res.status(400).json({message:"userid reqiuired"})
        }
        if(!password && !newPassword){
            return res.status({message:"Both password are required"})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(400).json({message:"Invalid Password"})
        }
        const hashPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashPassword;
         await user.save(); // Save the user to apply hooks if any
        // const updatePassword = await User.findByIdAndUpdate(userId,{password:hashPassword})

        // if(!updatePassword){
        //     return res.status(400).json({message:"Something went wrong"})
        // }
        return res.status(200).json({status:true,message:"User password updated successfully "})

    } catch (error) {
        return res.status(500).json({message:"User password not updated "})
        
    }
}

export const logout = async()=>{
    
}





