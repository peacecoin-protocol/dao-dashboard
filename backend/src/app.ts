import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import sbtRoutes from './routes/sbt.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '1mb' }))

  const mutationLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      status: 'VALIDATION_ERROR',
      message: 'Too many requests. Please try again later.',
    },
  })

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use(
    '/api/sbt',
    (req, res, next) => {
      if (req.method === 'GET') {
        next()
        return
      }
      mutationLimiter(req, res, next)
    },
    sbtRoutes
  )

  app.use(errorHandler)

  return app
}
