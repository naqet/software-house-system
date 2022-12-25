import Board from "./Board";
import KanbanSettings from "./KanbanSettings";

export default function Kanban() {
  return (
    <main className="grid h-fit w-full gap-4 p-4 align-top">
      <div className="flex h-fit items-center justify-between">
        <h1 className="text-2xl">Project</h1>
        <KanbanSettings />
      </div>
      <Board />
    </main>
  );
}
