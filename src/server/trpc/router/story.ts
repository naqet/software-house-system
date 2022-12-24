import { router, protectedProcedure } from "../trpc";
import z from "zod";

export const storyRouter = router({
	getAllFromProject: protectedProcedure
		.input(z.string())
		.query(({ input, ctx }) =>
			ctx.prisma.story.findMany({ where: { projectId: input } })
		),
});
