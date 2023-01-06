import React from "react";
import KanbanItem from "../KanbanItem";
import { Task } from "@prisma/client";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  data: Task;
};

const DraggableItem: React.FC<Props> = ({ data }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: data.id,
    data,
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <KanbanItem data={data} />
    </li>
  );
};

export default DraggableItem;
