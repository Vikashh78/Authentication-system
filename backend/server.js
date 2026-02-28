import express, { json } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import userDataRouter from './routes/userData.route.js'
import connectDB from './config/db.config.js'


const app = express()

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
    'http://localhost:5173',
    'https://authentication-system-backend-liard.vercel.app'
]

app.use(json())

app.use(cors({
    origin: allowedOrigins,
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

if(process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => (
        console.log(`Server is running on PORT ${PORT}`)
    ))
}

export default app