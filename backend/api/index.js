import app from '../server.js'
import connectDB from '../config/db.config.js'

let dbReadyPromise

async function ensureDb() {
  if (!dbReadyPromise) dbReadyPromise = connectDB()
  return dbReadyPromise
}

export default async function handler(req, res) {
  await ensureDb()
  return app(req, res)
}

