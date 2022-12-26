import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  updateSettings: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.user.update({
        where: { id: userId },
        data: { name: input },
      });
    }),
});
