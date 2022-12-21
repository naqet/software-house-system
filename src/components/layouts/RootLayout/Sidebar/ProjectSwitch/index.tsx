import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function ProjectSwitch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        title="Choose project"
        className="text-hover flex w-full items-center justify-between gap-2 text-lg font-extrabold dark:text-slate-600 lg:text-sm"
        onClick={() => setIsOpen((prevOpen) => !prevOpen)}
      >
        PROJECTS {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {/* TODO: add proper project changing logic with isOpen state */}
    </div>
  );
}
