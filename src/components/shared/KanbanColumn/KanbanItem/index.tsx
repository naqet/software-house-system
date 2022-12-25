import type { Epic, Story, Task } from "@prisma/client";
import { BiDotsHorizontal } from "react-icons/bi";

type Props = {
	data: Task | Epic | Story;
};

const KanbanItem: React.FC<Props> = ({ data }) => {
	return (
		<li className="rounded-lg p-2 transition-colors dark:bg-gray-800 dark:bg-opacity-30 dark:hover:bg-opacity-40">
			<div className="flex items-center justify-between">
				<h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
					{data.title}
				</h3>
				<button
					type="button"
					title="Actions"
					className="text-hover justify-self-end text-3xl"
				>
					<BiDotsHorizontal />
				</button>
			</div>
		</li>
	);
};

export default KanbanItem;
