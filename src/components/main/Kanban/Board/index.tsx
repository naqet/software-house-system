import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import Loader from "../../../shared/Loader";
import Column from "./Column";

export default function Board() {
	const router = useRouter();
	const { projectId } = router.query;

	if (!projectId || Array.isArray(projectId)) return <></>;

	const { isLoading, isError, data } =
		trpc.story.getAllFromProject.useQuery(projectId);

	if (isLoading) return <Loader />;

	if (isError) return <Loader />;

	return (
		<ul
			id="js-kanban-board"
			// data-list-view is added/removed programmatically in KanbanViewSettings
			className="flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-y-scroll dark:data-[list-view=true]:flex-col"
		>
			{[
				{ name: "Pending", data: [] },
				{ name: "Doing", data: [] },
				{ name: "Doing", data: [] },
				{ name: "Doing", data: [] },
			].map((column) => (
				<Column name={column.name} data={column.data} />
			))}
		</ul>
	);
}
