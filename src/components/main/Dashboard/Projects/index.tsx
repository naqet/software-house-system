import { trpc } from "../../../../utils/trpc";
import ProjectPreview from "./ProjectPreview";
import Loader from "../../../shared/Loader";

export default function Projects() {
	const {
		isLoading,
		isFetching,
		isError,
		data: projects,
		refetch,
	} = trpc.project.all.useQuery();

	if (isLoading || isFetching)
		return (
			<div className="my-4 grid place-items-center">
				<Loader />
			</div>
		);

	if (isError)
		return (
			<div className="my-4 grid place-items-center gap-4">
				<h2>Something went wrong</h2>
				<button className="blue-button" onClick={() => refetch()}>
					Try again
				</button>
			</div>
		);

	if (!projects.length)
		return (
			<div className="my-4 grid place-items-center">
				<h2>No projects found</h2>
			</div>
		);

	return (
		<ul className="flex flex-wrap gap-4 @lg:grid @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4">
			{projects.map((project) => (
				<li
					key={project.id}
					className="grid w-full @lg:col-span-1 @lg:row-span-1"
				>
					<ProjectPreview project={project} />
				</li>
			))}
		</ul>
	);
}
