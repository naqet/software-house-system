import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const kanbanRouter = router({
  getTasks: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.$transaction([
      ctx.prisma.story
        .findFirst({
          where: { projectId: input },
        })
        .epics({ select: { tasks: true } }),
      ctx.prisma.taskStatus.findMany(),
    ]);
  }),
  getEpics: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.$transaction([
      ctx.prisma.story
        .findFirst({
          where: { projectId: input },
        })
        .epics(),
      ctx.prisma.epicStatus.findMany(),
    ]);
  }),
  getStories: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.$transaction([
      ctx.prisma.story.findMany({
        where: { projectId: input },
      }),
      ctx.prisma.storyStatus.findMany(),
    ]);
  }),
});