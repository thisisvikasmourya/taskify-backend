import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { createProject ,getAllProject, updateProject,deleteProject,getAllProjectList} from "../controllers/project.controller.js"

const projectRoutes = express.Router()

projectRoutes.post("/create",verifyToken,createProject)
projectRoutes.get("/all-project",verifyToken,getAllProject)
projectRoutes.get("/project-list",verifyToken,getAllProjectList)
projectRoutes.patch("/update/:projectId",verifyToken,updateProject)
projectRoutes.delete("/delete/:projectId",verifyToken,deleteProject)


export default projectRoutes