import addProjectSchema from "../../../schemas/AddProjectSchema";
import { router, protectedProcedure } from "../trpc";
import z from "zod";

export const projectRouter = router({
  all: protectedProcedure.query(({ ctx }) => ctx.prisma.project.findMany()),
  unique: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) =>
      ctx.prisma.project.findUnique({ where: { id: input } })
    ),
  create: protectedProcedure
    .input(addProjectSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.create({
        data: {
          title: input.title,
          client: input.title,
          deadline: input.deadline,
          completionPercentage: 0,
        },
      });
    }),
});
