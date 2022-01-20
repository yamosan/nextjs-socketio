import "../styles/global.css";

import type { AppProps } from "next/app";
import StoreProvider from "../stores/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
