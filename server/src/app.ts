import express from 'express'
// import routes from './routes'
import { appRouter } from './routes'
import * as trpcExpress from '@trpc/server/adapters/express'
import { createContext } from './trpc' // assuming trpc.ts is in the same directory
import cors from 'cors'
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    // createContext,
  })
)

const PORT: number = Number(process.env.PORT) || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
