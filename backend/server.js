import express, { json } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import connectDB from './config/db.config.js'


const app = express()

const port = process.env.PORT || 8000
const server = http.createServer(app)

connectDB()

app.use(json())
app.use(cors({Credential: true}))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send(`API is working`)
})

if(process.NODE_ENV !== 'production') {
    server.listen(port, () => {
        console.log(`Server is listening on port: ${port}`)
    })
}

export default server