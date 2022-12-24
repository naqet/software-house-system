import { router } from "../trpc";
import { authRouter } from "./auth";
import { projectRouter } from "./project";
import { storyRouter } from "./story";

export const appRouter = router({
	project: projectRouter,
	auth: authRouter,
	story: storyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
