import { useRouter } from "next/router";
import KanbanSettings from "./KanbanSettings";
import StoriesBoard from "./StoriesBoard";
import EpicsBoard from "./EpicsBoard";
import TasksBoard from "./TasksBoard";

export default function Kanban() {
  const router = useRouter();
  const { mode } = router.query;
  return (
    <main className="grid h-fit w-full gap-4 p-4 align-top">
      <div className="flex h-fit items-center justify-between">
        <h1 className="text-2xl">Project</h1>
        <KanbanSettings />
      </div>
      {mode === "stories" ? (
        <StoriesBoard />
      ) : mode === "epics" ? (
        <EpicsBoard />
      ) : (
        <TasksBoard />
      )}
    </main>
  );
}
