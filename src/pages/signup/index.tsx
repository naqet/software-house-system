import { type NextPage } from "next";
import Head from "next/head";
import SignUpPanel from "../../components/authPanels/SignUpPanel";
import AuthLayout from "../../components/layouts/AuthLayout";

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Join us</title>
      </Head>
      <AuthLayout>
        <SignUpPanel />
      </AuthLayout>
    </>
  );
};

export default SignUpPage;
