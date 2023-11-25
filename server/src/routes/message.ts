import { router, publicProcedure } from '../trpc'
import prisma from '../prisma'
import { z } from 'zod'
export const messageRouter = router({
  getMany: publicProcedure
    .input(
      z.object({ filter: z.object({ id: z.number().optional() }).optional() })
    )
    .query(async ({ input }) => {
      const messages = await prisma.message.findMany({
        where: input.filter || {},
      })
      return messages
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const message = await prisma.message.findUnique({
        where: { id: input.id },
      })
      return message
    }),
  createOne: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const message = await prisma.message.create({
        data: {
          name: input.name,
        },
      })
      return message
    }),
  deleteOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const message = await prisma.message.delete({
        where: { id: input.id },
      })
      return message
    }),
})
