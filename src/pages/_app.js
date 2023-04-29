import "@/styles/globals.css";
import { Provider } from "react-redux"; // NOTE: So, we imported this
import { store } from "@/myReduxFiles/store";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children }) => (
  <div className="layout">
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

// export default function App({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   )
// }
