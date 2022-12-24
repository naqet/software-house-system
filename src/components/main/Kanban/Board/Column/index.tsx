import type { Story, Epic, Task } from "@prisma/client";
import { BiDotsHorizontal } from "react-icons/bi";

type Props = {
	name: string;
	data: Task[] | Epic[] | Task[];
};

const Column: React.FC<Props> = ({ name, data }) => {
	return (
		<li className="grid min-h-[calc(100vh-105px-3rem)] w-[calc(100vw-2rem)] flex-shrink-0 snap-start items-start gap-2 rounded-xl border-1 p-3 dark:border-slate-700 sm:h-[calc(100vh-105px-3rem)] sm:w-[300px]">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold dark:text-slate-400">{name}</h3>
				<button type="button">
					<BiDotsHorizontal className="text-hover text-xl" />
				</button>
			</div>
			{!data.length ? (
				<span className="text-center opacity-50">No data</span>
			) : (
				<ul>
					{data.map((piece) => (
						<li key={piece.id}>{piece.title}</li>
					))}
				</ul>
			)}
		</li>
	);
};

export default Column;
