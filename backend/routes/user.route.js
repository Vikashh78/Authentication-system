import express from 'express'
import { userRegister } from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)

export default userRouter;