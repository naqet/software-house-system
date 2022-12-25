import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Slider: React.FC<Props> = ({
  children,
  direction = "right",
  isOpen,
  setIsOpen,
}) => {
  // This conditional would be used many times inside classNames, so it'll be
  // rerendered every time anyway
  const isLeft = direction === "left";

  const [portal, setPortal] = useState<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    setPortal(document.querySelector("#slider-portal"));

    const handleClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleClick);

    return () => document.removeEventListener("keydown", handleClick);
  }, [setIsOpen]);

  if (!portal) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid w-screen bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "h-screen opacity-100" : "h-0 opacity-0"
      } ${isLeft ? "place-items-start" : "place-items-end"}`}
    >
      <aside
        data-expanded={isOpen}
        className={`flex h-full w-full max-w-md flex-col p-4 opacity-0 transition-all data-[expanded=true]:translate-x-0 data-[expanded=true]:opacity-100 dark:border-slate-800 dark:bg-slate-900 md:border-x-1 lg:min-w-[16rem] ${
          isLeft ? "-translate-x-full" : "translate-x-full"
        }`}
      >
        <button
          className={`border-hover text-hover rounded-lg p-2 text-xl ${
            isLeft ? "mr-auto" : "ml-auto"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <FiX />
        </button>
        {children}
      </aside>
    </div>,
    portal
  );
};

export default Slider;
