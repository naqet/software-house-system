import { useDroppable } from "@dnd-kit/core";
import type { Task } from "@prisma/client";
import { BiDotsHorizontal } from "react-icons/bi";
import DraggableItem from "./DraggableItem";

type Props = {
  name: string;
  statusId: number;
  tasks: Task[];
};

const KanbanColumn: React.FC<Props> = ({ name, statusId, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: statusId,
    data: { id: statusId, name },
  });

  return (
    <li
      ref={setNodeRef}
      className={`relative flex h-auto min-h-[calc(100vh-105px-3rem)] w-[calc(100vw-2rem)] flex-shrink-0 flex-col items-start gap-2 rounded-xl border-1 p-3 group-data-[list-view=true]:min-h-min group-data-[list-view=true]:w-full ${
        isOver
          ? "dark:border-blue-600 dark:border-opacity-50"
          : "dark:border-slate-800"
      } sm:h-[calc(100vh-105px-3rem)] sm:w-[300px] sm:group-data-[list-view=true]:h-fit`}
    >
      <div className="flex w-full items-center justify-between px-2">
        <h3 className="font-semibold dark:text-slate-400">{name}</h3>
        <button type="button">
          <BiDotsHorizontal className="text-hover text-xl" />
        </button>
      </div>
      <ul className="grid h-full w-full content-baseline items-start gap-2">
        {tasks.map((task) => (
          <DraggableItem key={task.id} data={task} />
        ))}
      </ul>
    </li>
  );
};

export default KanbanColumn;
