import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import KanbanColumn from "../../../shared/KanbanColumn";
import Loader from "../../../shared/Loader";

export default function StoriesBoard() {
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
			className="group flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-y-scroll dark:data-[list-view=true]:flex-col"
		>
			{[
				{ name: "Pending", data: [] },
				{ name: "Doing", data: [] },
				{ name: "Doing", data: [] },
				{ name: "Doing", data: [] },
			].map((column) => (
				<KanbanColumn name={column.name} data={column.data} />
			))}
		</ul>
	);
}
