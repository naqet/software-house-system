import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
	children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Header />
			<div className="flex min-h-[calc(100vh-73px)]">
				<Sidebar />
				{children}
			</div>
		</>
	);
};

export default RootLayout;
