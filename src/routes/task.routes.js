import express from "express"
import { createTask, getAllTask, getTaskByUserId, getTaskFilter, updateTask ,deleteTask} from "../controllers/task.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const taskRoute = express.Router()

taskRoute.post("/create",verifyToken,createTask)
taskRoute.get("/task",verifyToken,getAllTask)
taskRoute.get("/task/byUser",verifyToken,getTaskByUserId)
taskRoute.get("/task/user",verifyToken,getTaskFilter)
taskRoute.patch("/task/:taskId",verifyToken,updateTask)
taskRoute.delete("/task/:taskId",verifyToken,deleteTask)


export default taskRoute