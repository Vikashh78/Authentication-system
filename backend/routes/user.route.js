import express from 'express'
import { isAuthenticated, logoutUser, resetPassword, sendResetOtp, sendVerifyOtp, userLogin, userRegister, verifyEmail } from '../controller/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/logout', logoutUser)

userRouter.post('/send-verify-otp', authUser, sendVerifyOtp)
userRouter.post('/verify-email', authUser, verifyEmail)

userRouter.post('/is-auth', authUser, isAuthenticated)

userRouter.post('/send-reset-otp', sendResetOtp)
userRouter.post('/reset-pass', resetPassword)


export default userRouter;