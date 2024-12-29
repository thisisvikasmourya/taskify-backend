import express from "express"
import { changePassword, getProfile, login, register, updateProfile,getAllUserList } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post('/register',register)
router.post('/identity',login)
router.get('/profile',verifyToken,getProfile)
router.get('/list',getAllUserList)
router.patch('/updateprofile/:id',updateProfile)
router.patch('/change-password',verifyToken,changePassword)

export default router