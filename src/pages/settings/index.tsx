import Head from "next/head";
import RootLayout from "../../components/layouts/RootLayout";
import SettingsPanel from "../../components/main/SettingsPanel";

export default function Tets() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <RootLayout>
        <SettingsPanel />
      </RootLayout>
    </>
  );
}
