import { Task } from "@prisma/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { trpc } from "../../../../utils/trpc";
import KanbanColumn from "../../../shared/KanbanColumn";
import Loader from "../../../shared/Loader";

export default function TasksBoard() {
	const router = useRouter();
	const { projectId } = router.query;

	if (!projectId || Array.isArray(projectId)) return <></>;

	const { isLoading, isError, data } = trpc.kanban.getTasks.useQuery(projectId);

	const tasks = useMemo(() => {
		if (!data?.[0]) return [];

		return [
			...new Set(([] as Task[]).concat(...data[0].map((epic) => epic.tasks))),
		];
	}, [data?.[0]?.length]);

	if (isLoading) return <Loader />;

	if (isError) return <Loader />;

	const [, statuses] = data;

	return (
		<ul
			id="js-kanban-board"
			// data-list-view is added/removed programmatically in KanbanViewSettings
			className="group flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-y-scroll dark:data-[list-view=true]:flex-col"
		>
			{statuses.map((status) => (
				<KanbanColumn
					key={status.id}
					name={status.name}
					data={tasks.filter((task) => task.taskStatusId === status.id)}
				/>
			))}
		</ul>
	);
}
