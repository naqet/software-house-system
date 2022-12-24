import Head from "next/head";
import RootLayout from "../../../components/layouts/RootLayout";
import Kanban from "../../../components/main/Kanban";

export default function ProjectPage() {
	return (
		<>
			<Head>
				<title>Project page</title>
			</Head>
			<RootLayout>
				<Kanban />
			</RootLayout>
		</>
	);
}
