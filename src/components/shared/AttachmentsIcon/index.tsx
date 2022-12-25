import { FiPaperclip } from "react-icons/fi";

type Props = { count: number };

const AttachmentsIcon: React.FC<Props> = ({ count }) => {
	return (
		<div>
			<FiPaperclip />
			{count}
		</div>
	);
};

export default AttachmentsIcon;
