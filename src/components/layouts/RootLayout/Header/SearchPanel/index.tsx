import { FiSearch } from "react-icons/fi";

export default function SearchPanel() {
  // TODO: add search logic
  return (
    <button
      type="button"
      title="Search panel"
      className="text-hover md:border-hover text-3xl md:flex md:items-center md:gap-2 md:rounded-lg md:px-3 md:py-2 md:text-xl"
    >
      <FiSearch />
      <span className="hidden text-xs md:block">Search for anything</span>
    </button>
  );
}
