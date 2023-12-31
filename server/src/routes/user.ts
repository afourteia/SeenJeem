import { router, publicProcedure } from '../trpc'
import prisma from '../prisma'
import { z } from 'zod'
export const userRouter = router({
  getMany: publicProcedure.query(async () => {
    const users = await prisma.user.findMany()

    return users
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
      })
      return user
    }),
  createOne: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          name: input.name,
        },
      })
      return user
    }),
  deleteOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.delete({
        where: { id: input.id },
      })
      return user
    }),
})
