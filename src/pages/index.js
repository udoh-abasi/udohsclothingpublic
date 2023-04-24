import { Link, BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { HomeBody } from "./HomeBody";
import { Footer } from "./Footer";
import { MenPage } from "./MenPage";

export default function Home() {
  return (
    <main id="home" className="overflow-hidden">
      <Header />
      {/* <HomeBody /> */}
      <MenPage />
      <Footer />
    </main>
  );
}
