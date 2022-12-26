import { type NextPage } from "next";
import Head from "next/head";
import RemindPasswordPanel from "../../components/authPanels/RemindPasswordPanel";
import AuthLayout from "../../components/layouts/AuthLayout";

const RemindPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Join us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <RemindPasswordPanel />
      </AuthLayout>
    </>
  );
};

export default RemindPasswordPage;
