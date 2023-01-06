import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import { Task, TaskStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import isTask from "../../../types/isTask";
import { trpc } from "../../../utils/trpc";
import Loader from "../../shared/Loader";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanColumn/KanbanItem";
import KanbanSettings from "./KanbanSettings";

type Status = TaskStatus & {
  tasks: Task[];
};

export default function Kanban() {
  const router = useRouter();
  const { projectId } = router.query;
  const { data, isError, isLoading, isSuccess } = trpc.kanban.getData.useQuery(
    typeof projectId === "string" ? projectId : ""
  );
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const sensors = [useSensor(MouseSensor), useSensor(TouchSensor)];

  const handleDragStart = ({ active }: DragStartEvent) => {
    const draggedItem = active.data.current;
    if (!isTask(draggedItem)) return;
    setDraggedTask(draggedItem);
  };

  const handleDragCancel = () => {
    setDraggedTask(null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    try {
      const overContainerId = over?.id;
      const currentContainerId = active?.data?.current?.taskStatusId;
      if (!overContainerId || currentContainerId === overContainerId) {
        setDraggedTask(null);
        return;
      }

      setStatuses((prevData) => {
        try {
          if (!isTask(active.data.current)) return prevData;

          // We need to make a deep copy of the data
          const newData = JSON.parse(JSON.stringify(prevData)) as Status[];

          const prevStatusIndex = newData.findIndex(
            (status) => status.id === currentContainerId
          );

          const prevStatus = newData[prevStatusIndex];

          if (prevStatus?.tasks) {
            prevStatus.tasks =
              newData[prevStatusIndex]?.tasks.filter(
                (task) => task.id !== active.data.current?.id
              ) ?? [];
          }

          const nextStatusIndex = newData.findIndex(
            (status) => status.id === overContainerId
          );

          newData[nextStatusIndex]?.tasks.push({
            ...active.data.current,
            taskStatusId: Number(overContainerId),
          });

          return newData;
        } catch {
          return prevData;
        }
      });
      setDraggedTask(null);
    } catch {
      setDraggedTask(null);
      return;
    }
  };

  useEffect(() => {
    if (!isSuccess) return;
    // We need to set this data in useState, so we can
    // manipulate it on drag movements
    setStatuses(data);
  }, [isSuccess]);

  if (isLoading || isError) return <Loader />;

  return (
    <main className="grid h-fit w-full gap-4 p-4 align-top">
      <div className="flex h-fit items-center justify-between">
        <h1 className="text-2xl">Project</h1>
        <KanbanSettings />
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
      >
        <ul
          id="js-kanban-board"
          // data-list-view is added/removed programmatically in KanbanViewSettings
          className={`group flex w-full flex-nowrap gap-4 overflow-y-scroll dark:data-[list-view=true]:flex-col`}
        >
          {statuses.map((status) => (
            <KanbanColumn
              key={status.id}
              name={status.name}
              statusId={status.id}
              tasks={status.tasks}
            />
          ))}
          <DragOverlay>
            {draggedTask ? <KanbanItem data={draggedTask} dragOverlay /> : null}
          </DragOverlay>
        </ul>
      </DndContext>
    </main>
  );
}
