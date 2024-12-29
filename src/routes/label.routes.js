import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
// import { createProject ,getAllProject, updateProject,deleteProject} from "../controllers/project.controllers.js"
import { createLabel, deleteLabel, getLabels, updateLabel } from "../controllers/labels.controller.js"

const labelRoutes = express.Router()

labelRoutes.post("/create",verifyToken,createLabel)
labelRoutes.get("/all-label",verifyToken,getLabels)
labelRoutes.patch("/update/:labelId",verifyToken,updateLabel)
labelRoutes.delete("/delete/:labelId",verifyToken,deleteLabel)


export default labelRoutes