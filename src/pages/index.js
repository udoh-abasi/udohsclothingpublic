import Image from "next/image";
import { Link, BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { HomeBody } from "./HomeBody";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <main className="">
      <Header />
      <HomeBody />
      <Footer />
    </main>
  );
}
