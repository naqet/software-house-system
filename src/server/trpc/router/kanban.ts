import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const kanbanRouter = router({
  getData: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) =>
      ctx.prisma.taskStatus.findMany({
        include: { tasks: { where: { projectId: input } } },
      })
    ),
});
