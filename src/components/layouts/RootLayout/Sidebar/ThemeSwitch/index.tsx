import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const [lightMode, setLightMode] = useState(false);

  const handleThemeSwitch = () => {
    setLightMode((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      title="Switch dark mode"
      className="border-hover text-hover block rounded-lg py-2 px-8 text-2xl disabled:opacity-80 dark:bg-slate-800"
      onClick={handleThemeSwitch}
    >
      {lightMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}
