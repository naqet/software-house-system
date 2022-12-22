import { useEffect, useState } from "react";
import { FiMoon, FiMoreHorizontal, FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const [lightMode, setLightMode] = useState<boolean | undefined>(undefined);
  const loading = typeof lightMode === "undefined";

  const handleThemeSwitch = () => {
    setLightMode((prevMode) => {
      if (prevMode) {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
      } else {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
      }
      return !prevMode;
    });
  };

  useEffect(() => {
    if (localStorage.theme === "light") {
      setLightMode(true);
    } else {
      setLightMode(false);
    }
  }, []);

  return (
    <button
      type="button"
      title="Switch dark mode"
      className="border-hover text-hover block rounded-lg py-2 px-8 text-2xl disabled:opacity-80 dark:bg-slate-800"
      onClick={handleThemeSwitch}
      disabled={loading}
    >
      {loading ? <FiMoreHorizontal /> : lightMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}
