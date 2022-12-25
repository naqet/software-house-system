import { useState } from "react";
import Slider from "../Slider";
import AddProjectPanel from "./AddProjectPanel";

type Props = {
  className: string;
  children: React.ReactNode;
};

const AddProjectButton: React.FC<Props> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        {children}
      </button>
      <Slider isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddProjectPanel />
      </Slider>
    </>
  );
};

export default AddProjectButton;
