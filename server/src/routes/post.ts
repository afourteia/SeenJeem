import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const postRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation((opts) => {
      const { input } = opts
      // [...]
    }),
  list: publicProcedure.query(() => {
    // ...
    return []
  }),
})
