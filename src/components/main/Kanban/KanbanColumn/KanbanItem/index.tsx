import type { Task } from "@prisma/client";
import AttachmentsIcon from "../../../../shared/AttachmentsIcon";
import TimeTag from "../../../../shared/TimeTag";

type Props = {
  data: Task;
  dragOverlay?: boolean;
};

const KanbanItem: React.FC<Props> = ({ data, dragOverlay = false }) => {
  return (
    <div
      className={`grid gap-2 rounded-lg p-2 transition-colors group-data-[list-view=true]:grid-cols-[1fr_min-content] dark:bg-gray-800 dark:bg-opacity-30 dark:hover:bg-opacity-40 ${
        dragOverlay ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
        {data.title}
      </h3>
      <div className="flex items-center gap-2">
        <AttachmentsIcon count={data.attachments.length} />
        <TimeTag deadline={data.deadline} />
        <button
          type="button"
          title="See details"
          className="border-hover text-hover ml-auto cursor-pointer rounded-lg px-2 py-1 text-xs"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default KanbanItem;
