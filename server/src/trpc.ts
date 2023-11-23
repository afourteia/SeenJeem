import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create()

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
