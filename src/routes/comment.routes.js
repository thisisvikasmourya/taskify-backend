import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { addComment,updateComment ,getCommentByTaskId, deleteComment} from "../controllers/comment.controller.js"

const commentRoutes = express.Router()

commentRoutes.post("/tasks/:taskId/comments",verifyToken,addComment)
commentRoutes.patch("/tasks/:taskId/comments",verifyToken,updateComment)
commentRoutes.get("/tasks/:taskId/comments",verifyToken,getCommentByTaskId)
commentRoutes.delete("/tasks/:commentId",verifyToken,deleteComment)


export default commentRoutes