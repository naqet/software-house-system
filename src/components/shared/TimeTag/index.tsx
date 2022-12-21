import { FiClock } from "react-icons/fi";

type Props = {
  deadline: Date;
};

const TimeTag: React.FC<Props> = ({ deadline }) => {
  const deadlineTime = new Date(deadline).getTime();
  const timeLeft = Number(
    (
      (deadlineTime - new Date().getTime()) / (1000 * 60 * 60 * 24) +
      1
    ).toFixed()
  );

  if (timeLeft < 0)
    return (
      <div
        className="flex w-fit flex-nowrap items-center gap-1 rounded-lg bg-violet-500
			bg-opacity-20 p-1 text-[0.5rem] text-violet-900 dark:text-violet-200"
      >
        <FiClock /> <span>Past deadline</span>
      </div>
    );

  return (
    <div
      className={`flex w-fit flex-nowrap items-center gap-1 rounded-lg p-1 text-[0.5rem] ${
        timeLeft <= 3
          ? "bg-red-500 bg-opacity-20 text-red-900 dark:text-red-200"
          : timeLeft <= 14
          ? "bg-amber-500 bg-opacity-20 text-amber-900 dark:text-amber-200"
          : "bg-green-500 bg-opacity-20 text-green-900 dark:text-green-200"
      }`}
    >
      <FiClock />{" "}
      <span>
        {timeLeft} day{timeLeft !== 1 && "s"} left
      </span>
    </div>
  );
};

export default TimeTag;
