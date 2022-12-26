import UserSettings from "./UserSettings";

export default function SettingsPanel() {
  return (
    <main className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl">Settings</h1>
      <UserSettings />
    </main>
  );
}
