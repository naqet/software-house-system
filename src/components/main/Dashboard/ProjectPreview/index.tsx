import { Project } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import ProgressBar from "../../../shared/ProgressBar";
import TimeTag from "../../../shared/TimeTag";

type Props = {
  project: Project;
};

const ProjectPreview: React.FC<Props> = ({ project }) => {
  return (
    <Link
      href={`project/${project.id}`}
      tabIndex={0}
      className="grid w-full gap-1 rounded-lg p-4 transition-colors dark:bg-gray-800 dark:bg-opacity-30 dark:hover:bg-opacity-40 dark:focus-visible:bg-opacity-40"
    >
      <div className="grid grid-cols-[1fr_2rem] grid-rows-1 items-center gap-1">
        <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          {project.title}
        </h3>
        <button
          type="button"
          title="Project action buttons"
          className="text-hover justify-self-end text-3xl"
          onClick={(e) => {
            // This prevents router to act, as this button is inside a Link
            e.preventDefault();
          }}
        >
          {/* TODO: add menu logic */}
          <BiDotsHorizontal />
        </button>
      </div>
      <h4 className="font-roboto text-sm opacity-80">{project.client}</h4>
      <TimeTag deadline={project.deadline} />
      <ProgressBar value={project.completionPercentage} />
    </Link>
  );
};

export default ProjectPreview;
