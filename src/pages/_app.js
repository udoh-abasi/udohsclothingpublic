import "@/styles/globals.css";
import { Provider } from "react-redux"; // NOTE: So, we imported this
import { store } from "@/myReduxFiles/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
