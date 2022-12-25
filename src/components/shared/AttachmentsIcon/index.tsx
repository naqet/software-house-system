import { FiPaperclip } from "react-icons/fi";

type Props = { count: number };

const AttachmentsIcon: React.FC<Props> = ({ count }) => {
  return (
    <div className="flex items-center gap-0.5 text-xs opacity-50">
      <FiPaperclip />
      {count}
    </div>
  );
};

export default AttachmentsIcon;
