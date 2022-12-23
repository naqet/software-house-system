import { useState } from "react";
import Slider from "../Slider";

type Props = {
  className: string;
};

const AddProjectButton: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        Add project
      </button>
      <Slider isOpen={isOpen} setIsOpen={setIsOpen}>
        hello
      </Slider>
    </>
  );
};

export default AddProjectButton;
