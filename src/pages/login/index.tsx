import { type NextPage } from "next";
import Head from "next/head";
import LogInPanel from "../../components/authPanels/LogInPanel";
import AuthLayout from "../../components/layouts/AuthLayout";

const LogInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome back</title>
      </Head>
      <AuthLayout>
        <LogInPanel />
      </AuthLayout>
    </>
  );
};

export default LogInPage;
