import type { Story, Epic, Task } from "@prisma/client";
import { BiDotsHorizontal } from "react-icons/bi";
import KanbanItem from "./KanbanItem";

type Props = {
  name: string;
  data?: Task[] | Epic[] | Story[];
};

const KanbanColumn: React.FC<Props> = ({ name, data }) => {
  return (
    <li className="relative flex h-auto min-h-[calc(100vh-105px-3rem)] w-[calc(100vw-2rem)] flex-shrink-0 snap-start flex-col items-start gap-2 rounded-xl border-1 p-3 group-data-[list-view=true]:min-h-min group-data-[list-view=true]:w-full dark:border-slate-800 sm:h-[calc(100vh-105px-3rem)] sm:w-[300px] sm:group-data-[list-view=true]:h-fit">
      <div className="flex w-full items-center justify-between px-2">
        <h3 className="font-semibold dark:text-slate-400">{name}</h3>
        <button type="button">
          <BiDotsHorizontal className="text-hover text-xl" />
        </button>
      </div>
      {!data || !data.length ? (
        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center opacity-50">
          No data
        </span>
      ) : (
        <ul className="grid w-full items-start gap-2 overflow-y-scroll">
          {data.map((piece) => (
            <KanbanItem key={piece.id} data={piece} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default KanbanColumn;
