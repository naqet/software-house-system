import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import Loader from "../../shared/Loader";
import KanbanColumn from "./KanbanColumn";
import KanbanSettings from "./KanbanSettings";

export default function Kanban() {
  const router = useRouter();
  const { projectId } = router.query;

  const { data, isError, isLoading } = trpc.task.fromProject.useQuery(
    typeof projectId === "string" ? projectId : ""
  );

  if (isError || isLoading) return <Loader />;

  const [tasks, columns] = data;

  return (
    <main className="grid h-fit w-full gap-4 p-4 align-top">
      <div className="flex h-fit items-center justify-between">
        <h1 className="text-2xl">Project</h1>
        <KanbanSettings />
      </div>
      <ul
        id="js-kanban-board"
        // data-list-view is added/removed programmatically in KanbanViewSettings
        className="group flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-y-scroll dark:data-[list-view=true]:flex-col"
      >
        {columns.map((column) => (
          <KanbanColumn
            name={column.name}
            data={tasks.filter((task) => task.taskStatusId === column.id)}
          />
        ))}
      </ul>
    </main>
  );
}
