import { router, publicProcedure, protectedProcedure } from "../trpc";

export const projectRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  test: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findFirst();
  }),
});
