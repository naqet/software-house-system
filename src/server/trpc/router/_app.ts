import { router } from "../trpc";
import { authRouter } from "./auth";
import { kanbanRouter } from "./kanban";
import { projectRouter } from "./project";

export const appRouter = router({
	project: projectRouter,
	auth: authRouter,
	kanban: kanbanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
