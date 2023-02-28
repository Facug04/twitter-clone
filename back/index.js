import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import postRouter from './src/routes/post.js'

dotenv.config()

const PORT = 3001
const expressApp = express()

expressApp.use(express.json())
expressApp.use(cors({ origin: true, credentials: true }))

expressApp.use('/post', postRouter)

const bootstrap = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    expressApp.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`)
    })
  })
}

bootstrap()
