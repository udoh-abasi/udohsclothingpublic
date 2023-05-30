import Head from "next/head";
import { HomeBody } from "./HomeBody";

export default function Home() {
  return (
    <>
      <Head>
        <title>Udohs</title>
      </Head>
      <main>
        <HomeBody />
      </main>
    </>
  );
}
