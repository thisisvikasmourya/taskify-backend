
import Task from "../models/task.model.js"
import mongoose from "mongoose"

export const createTask = async (req, res) => {
    const userId = req.user.id
    const { title, description, status, assignedTo, priority,project } = req.body
    try {
        console.log(req.user.id,"thisisisisis")
        if (!title || !description || !status || !assignedTo || !priority) {
            return res.status(400).json({ message: "All task fields are Required" })
        }
        if (!userId) {
            return res.status(400).json({ message: "User are Required" })
        }
        const task = new Task({
            title, description, status, assignedTo, priority,createdBy:userId,project
        })

        const savedTask = await task.save();
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: savedTask,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const getAllTask = async (req, res) => {
    const page = req.query.page
    try {
        console.log( typeof page,"page");
        
        const limit = 10
        // console.log(page, "page")
        const skip = (page - 1) * limit

        const tasks = await Task.find().skip(skip)
            .limit(Number(limit))
        const totalTasks = await Task.countDocuments();
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalTasks / limit),
                totalTasks,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getTaskByUserId = async (req, res) => {

    const userId  = req.user.id
    try {
        // console.log(userId,"Log")
        const usertask = await Task.find({createdBy:userId})
        console.log(usertask,"userTask")
        return res.status(200).json({message:"User task Reterive successfully",usertask})

    } catch (error) {
        return res.status(500).json({message:error.message})

    }
}

export const getTaskFilter = async (req, res) => {

    try {
        const filter  = req.query
        // console.log(userId,"Log")
        const usertask = await Task.find(filter)
        console.log(usertask,"userTask")
        return res.status(200).json({message:"User task Reterive successfully",usertask})

    } catch (error) {
        return res.status(500).json({message:error.message})

    }
}

export const updateTask = async (req, res) => {
        const taskId = req.params
        const data = req.body
        console.log(data,"taskId")
    try {
        if(!taskId){
            return res.status(400).json({message:" Task Id is required"})
        }
        if(!data){
            return res.status(400).json({message:"Fields are required"})
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId.taskId,data)

        return res.status(200).json({message:"TasK Updated Successfully",updatedTask})
    } catch (error) {
        return res.status(500).json({message:error.message})

    }
}

export const deleteTask = async (req, res) => {
        const taskId =  req.params
        const userId = req.user.id
        
    try {
        if (!taskId) {
            return res.status(400).json({ success: false, message: "Task ID is required" });
          }
          if (!mongoose.Types.ObjectId.isValid(taskId.taskId)) {
            return res.status(400).json({ success: false, message: "Invalid Task ID" });
          }
      
          // Check if task exists
          const task = await Task.findById(taskId.taskId);
          if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
          }
        if(!userId){
            return res.status(400).json({message:"unathourized"})
        }
        await Task.findByIdAndDelete(taskId.taskId)
        res.status(200).json({message:"Task deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}