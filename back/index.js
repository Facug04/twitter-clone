import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import postRouter from './routes/post.js'

dotenv.config()

const PORT = 3001
const expressApp = express()

expressApp.use(express.json())
expressApp.use(cors({ origin: true, credentials: true }))

expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

expressApp.use('/post', postRouter)

const bootstrap = async () => {
  await mongoose.connect(process.env.MONGODB_URL)

  expressApp.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} prueba`)
  })
}

bootstrap()
