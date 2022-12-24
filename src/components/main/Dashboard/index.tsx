import { trpc } from "../../../utils/trpc";
import ProjectPreview from "./ProjectPreview";
import Loader from "../../shared/Loader";
import AddProjectButton from "../../shared/AddProjectButton";
import { FiPlus } from "react-icons/fi";

export default function Dashboard() {
  const { isLoading, isError, data: projects } = trpc.project.all.useQuery();

  if (isLoading) return <Loader />;

  if (isError) return <Loader />;

  if (!projects.length)
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
        <div className="flex items-center justify-between">
          <h2 className="font-semibold dark:text-slate-400">Projects</h2>

          <AddProjectButton className="blue-button mr-0 flex gap-1 px-2 text-xs">
            <FiPlus className="text-base" />
            <span className="hidden md:block">Add project</span>
          </AddProjectButton>
        </div>
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
      </div>
    </main>
  );
}
