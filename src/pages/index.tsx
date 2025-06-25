
import Head from 'next/head';
import Main from '../Main';

export default function Home() {
  return (
    <>
      <Head>
        <title>SpiñO – Spinoza AI Reflection</title>
        <meta name="description" content="An intelligent reflection assistant based on Spinoza’s Ethics." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}
