import express from 'express'
import { logoutUser, sendVerifyOtp, userLogin, userRegister, verifyEmail } from '../controller/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.get('/login', userLogin)
userRouter.post('/logout', logoutUser)
userRouter.post('/verify', authUser, sendVerifyOtp)
userRouter.post('/verify-email', authUser, verifyEmail)

export default userRouter;