import express, { json } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import userDataRouter from './routes/userData.route.js'
import connectDB from './config/db.config.js'


const app = express()

app.use(json())

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(cookieParser())

connectDB()

// API Endpoints
app.use('/api/user/', userRouter);
app.use('/api/user-data/', userDataRouter)

app.get('/', (req, res) => {
    res.send(`API is working`)
})


export default app