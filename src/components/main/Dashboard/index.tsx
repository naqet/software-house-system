import AddProjectButton from "../../shared/AddProjectButton";
import { FiPlus } from "react-icons/fi";
import Projects from "./Projects";

export default function Dashboard() {
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
				<Projects />
			</div>
		</main>
	);
}
