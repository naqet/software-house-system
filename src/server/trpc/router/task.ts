import { router, protectedProcedure } from "../trpc";
import z from "zod";

export const taskRouter = router({
  fromProject: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) =>
      ctx.prisma.$transaction([
        ctx.prisma.task.findMany({ where: { projectId: input } }),
        ctx.prisma.taskStatus.findMany(),
      ])
    ),
});
