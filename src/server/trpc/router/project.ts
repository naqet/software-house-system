import addProjectSchema from "../../../schemas/AddProjectSchema";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const projectRouter = router({
  all: publicProcedure.query(({ ctx }) => ctx.prisma.project.findMany()),
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
