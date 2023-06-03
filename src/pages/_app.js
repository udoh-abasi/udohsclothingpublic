import "@/styles/globals.css";
import { Provider } from "react-redux"; // NOTE: So, we imported this
import { store } from "@/myReduxFiles/store";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>

    <Header />
    {children}
    <Footer />
  </div>
);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
