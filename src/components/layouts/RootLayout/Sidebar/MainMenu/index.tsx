import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiCheckSquare,
  FiGrid,
  FiMessageCircle,
  FiSettings,
} from "react-icons/fi";
import useToggleSidebar from "../../../../../utils/customHooks/useToggleSidebar";

type Path = {
  icon: JSX.Element;
  url: string;
  label?: string;
};

const paths: Path[] = [
  { icon: <FiGrid />, url: "/", label: "dashboard" },
  { icon: <FiCheckSquare />, url: "project" },
  { icon: <FiMessageCircle />, url: "messages" },
  { icon: <FiSettings />, url: "settings" },
];

export default function MainMenu() {
  const router = useRouter();
  const toggleSidebar = useToggleSidebar(true);

  return (
    <nav>
      <ul className="grid gap-6">
        {paths.map((path) => (
          <li key={path.url} className="capitalize">
            <Link
              href={path.url}
              className="text-hover flex items-center before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full before:transition-colors data-[active=true]:before:bg-current dark:data-[active=true]:text-slate-200"
              data-active={
                router.pathname === path.url ||
                router.pathname.split("/")[1] === path.url
              }
              tabIndex={0}
              onClick={toggleSidebar}
            >
              <span className="mr-5 text-2xl">{path.icon}</span>{" "}
              {path.label ?? path.url}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
