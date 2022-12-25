import { useRouter } from "next/router";
import type { ChangeEvent } from "react";

const ModeSwitch = () => {
  const router = useRouter();
  const { mode, projectId } = router.query;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/project/${projectId}?mode=${event.target.value}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="relative text-sm">
      <select
        className="border-hover text-hover flex cursor-pointer items-center gap-1 rounded-lg bg-transparent px-2 py-1 capitalize"
        title="Select kanban mode"
        value={mode ?? "tasks"}
        onChange={handleChange}
      >
        <option value="tasks">Tasks</option>
        <option value="epics">Epics</option>
        <option value="stories">Stories</option>
      </select>
    </div>
  );
};

export default ModeSwitch;
