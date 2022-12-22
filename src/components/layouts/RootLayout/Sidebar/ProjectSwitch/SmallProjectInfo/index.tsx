import ProgressBar from "../../../../../shared/ProgressBar";

export default function SmallProjectInfo() {
  return (
    <div className="my-2">
      <h2 className="flex items-center gap-4 text-xl lg:text-base">
        <span className="h-10 w-10 rounded-lg bg-red-400" /> Project Name
      </h2>
      <ProgressBar value={33} />
    </div>
  );
}
