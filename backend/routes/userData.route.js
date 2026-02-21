import express from 'express'
import authUser from '../middleware/authUser.middleware.js'
import { userData } from '../controller/userDate.controller.js'

const userDataRouter = express.Router()

userDataRouter.get('/data', authUser, userData)

export default userDataRouter