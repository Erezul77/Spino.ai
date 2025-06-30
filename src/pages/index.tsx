
import Head from "next/head";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("../Main"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>SpiñO – Your Reflection Companion</title>
      </Head>
      <Main />
    </>
  );
}
