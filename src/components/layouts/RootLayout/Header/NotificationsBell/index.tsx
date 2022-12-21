import { FiBell } from "react-icons/fi";

export default function NotificationsBell() {
  // TODO: add notification logic
  return (
    <button
      title="Notifications"
      type="button"
      className="text-hover rounded-full text-3xl md:text-xl"
    >
      <FiBell />
    </button>
  );
}
