import type { Epic, Story, Task } from "@prisma/client";
import AttachmentsIcon from "../../AttachmentsIcon";
import TimeTag from "../../TimeTag";

type Props = {
	data: Task | Epic | Story;
};

const KanbanItem: React.FC<Props> = ({ data }) => {
	return (
		<li className="flex flex-col gap-2 rounded-lg p-2 transition-colors group-data-[list-view=true]:flex-row dark:bg-gray-800 dark:bg-opacity-30 dark:hover:bg-opacity-40">
			<h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
				{data.title}
			</h3>
			<div className="flex items-center gap-2">
				<AttachmentsIcon count={data.attachments.length} />
				<TimeTag deadline={data.deadline} />
				<button
					type="button"
					title="See details"
					className="border-hover text-hover ml-auto rounded-lg px-2 py-1 text-xs"
				>
					Details
				</button>
			</div>
		</li>
	);
};

export default KanbanItem;
