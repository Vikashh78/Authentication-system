import express from 'express'
import { logoutUser, userLogin, userRegister } from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)

userRouter.get('/login', userLogin)

userRouter.post('/logout', logoutUser)

export default userRouter;