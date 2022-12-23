import { type Dispatch, type SetStateAction, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

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
	useEffect(() => {
		if (isOpen) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "scroll";
		}
	}, [isOpen]);

	const portal = useMemo(() => document.querySelector("#slider-portal"), []);

	if (!portal) return null;

	return createPortal(
		<div
			className={`fixed inset-0 z-50 grid w-screen bg-black bg-opacity-50 transition-opacity ${isOpen ? "h-screen opacity-100" : "h-0 opacity-0"
				} ${direction === "left" ? "place-items-start" : "place-items-end"}`}
			onClick={() => {
				setIsOpen(false);
			}}
		>
			<aside
				data-expanded={isOpen}
				className={`flex h-full w-full max-w-md p-4 opacity-0 transition-all data-[expanded=true]:translate-x-0 data-[expanded=true]:opacity-100 dark:border-slate-800 dark:bg-slate-900 md:border-x-1 lg:min-w-[16rem] ${direction === "left" ? "-translate-x-full" : "translate-x-full"
					}`}
			>
				{children}
			</aside>
		</div>,
		portal
	);
};

export default Slider;
