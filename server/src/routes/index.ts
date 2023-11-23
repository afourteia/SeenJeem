import express from 'express'
import * as controllers from '../controllers'

import { router, publicProcedure, mergeRouters } from '../trpc'
import { z } from 'zod'

import { userRouter } from './user'
import { postRouter } from './post'

const appRouter = mergeRouters(userRouter, postRouter)

// You can then access the merged route with
// http://localhost:3000/trpc/<NAMESPACE>.<PROCEDURE>

export type AppRouter = typeof appRouter
export default appRouter

// Define your routes here
// For example, if you have a controller method for getting a user by ID:
// router.get('/users/:id', controllers.getUserById);
