import express, { json } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import userDataRouter from './routes/userData.route.js'
import connectDB from './config/db.config.js'


const app = express()

app.use(json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())

connectDB()

// API Endpoints
app.use('/api/user/', userRouter);
app.use('/api/user-data/', userDataRouter)

app.get('/', (req, res) => {
    res.send(`API is working`)
})


export default app