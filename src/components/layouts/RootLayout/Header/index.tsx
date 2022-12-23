import Avatar from "./Avatar";
import MenuButton from "./MenuButton";
import SearchPanel from "./SearchPanel";
import NotificationsBell from "./NotificationsBell";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b-1 p-4 dark:border-slate-800 dark:bg-slate-900">
      <MenuButton />

      {/* TODO: Add Logo*/}
      <div className="hidden h-10 w-10 bg-red-300 lg:block" />

      <div className="flex items-center gap-4">
        <SearchPanel />
        <NotificationsBell />
        <Avatar />
      </div>
    </header>
  );
}
