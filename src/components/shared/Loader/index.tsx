import { FiLoader } from "react-icons/fi";

type Props = {
  className?: string;
};

const Loader: React.FC<Props> = ({ className }) => {
  return (
    <section className={`grid w-full place-items-center ${className}`}>
      <FiLoader className="animate-spin text-xl" />
    </section>
  );
};

export default Loader;
