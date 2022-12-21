import MainMenu from "./MainMenu";
import ProjectSwitch from "./ProjectSwitch";
import SmallProjectInfo from "./ProjectSwitch/SmallProjectInfo";
import SignOutButton from "./SignOutButton";
import ThemeSwitch from "./ThemeSwitch";

export default function Sidebar() {
  return (
    <aside
      id="js-sidebar"
      data-expanded="false"
      className="fixed top-[73px] z-10 flex h-[calc(100%-73px)] w-full max-w-md -translate-x-full flex-col p-4 opacity-0 transition-all data-[expanded=true]:translate-x-0 data-[expanded=true]:opacity-100 dark:border-slate-800 dark:bg-slate-900 md:border-r-1 lg:sticky lg:h-[calc(100vh-73px)] lg:w-64 lg:min-w-[16rem] lg:translate-x-0 lg:opacity-100"
    >
      <ProjectSwitch />
      <SmallProjectInfo />
      <hr className="mt-5 mb-16 border-t-1 dark:border-slate-600" />
      <MainMenu />
      <ul className="mt-auto flex w-full justify-around gap-4">
        <li>
          <SignOutButton />
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </aside>
  );
}
