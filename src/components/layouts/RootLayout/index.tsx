import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    if (
      localStorage.theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-73px)]">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default RootLayout;
