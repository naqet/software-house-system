import { FiLoader } from "react-icons/fi";

const Loader: React.FC = () => {
  return (
    <section className="grid w-full place-items-center">
      <FiLoader className="animate-spin text-xl" />
    </section>
  );
};

export default Loader;
