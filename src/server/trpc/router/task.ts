import { router, protectedProcedure } from "../trpc";
import z from "zod";

export const taskRouter = router({
  updateStatus: protectedProcedure
    .input(z.object({ taskId: z.string(), taskStatusId: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.update({
        where: { id: input.taskId },
        data: { taskStatusId: input.taskStatusId },
      });
    }),
});
