import { BiMenuAltLeft } from "react-icons/bi";
import useToggleSidebar from "../../../../../utils/customHooks/useToggleSidebar";

export default function MenuButton() {
  const toggleSidebar = useToggleSidebar();

  return (
    <button
      type="button"
      title="Sidebar menu"
      className="text-hover text-4xl lg:hidden"
      onClick={toggleSidebar}
    >
      <BiMenuAltLeft />
    </button>
  );
}
