import { trpc } from "../../../utils/trpc";
import ProjectPreview from "./ProjectPreview";
import Loader from "../../shared/Loader";

export default function Dashboard() {
  const projects = trpc.project.all.useQuery();

  if (projects.isLoading) return <Loader />;

  if (projects.isError) return <Loader />;

  if (!projects.data.length)
    return (
      <main className="grid h-[calc(100vh-90px)] w-full place-items-center lg:h-auto">
        <div className="grid justify-center gap-4">
          <h1 className="text-2xl">No projects found</h1>
          <button type="button" className="blue-button" title="Add new project">
            Add new project
          </button>
        </div>
      </main>
    );

  return (
    <main className="grid h-fit w-full gap-4 p-4 align-top">
      <h1 className="text-2xl">
        Hi James,{" "}
        <span className="font-roboto text-base font-normal dark:text-slate-400">
          here are your current projects
        </span>
      </h1>
      <div className="grid w-full gap-4 rounded-lg border-1 p-4 @container dark:border-slate-800">
        <h2 className="font-semibold dark:text-slate-400">Projects</h2>
        <ul className="flex flex-wrap gap-4 @lg:grid @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4">
          {projects.data.map((project) => (
            <li
              key={project.id}
              className="grid w-full @lg:col-span-1 @lg:row-span-1"
            >
              <ProjectPreview project={project} />
            </li>
          ))}
          {/* TODO: handle adding new project */}
        </ul>
      </div>
    </main>
  );
}
