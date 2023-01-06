import { router } from "../trpc";
import { authRouter } from "./auth";
import { kanbanRouter } from "./kanban";
import { projectRouter } from "./project";
import { taskRouter } from "./task";
import { userRouter } from "./user";

export const appRouter = router({
  project: projectRouter,
  auth: authRouter,
  user: userRouter,
  task: taskRouter,
  kanban: kanbanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
