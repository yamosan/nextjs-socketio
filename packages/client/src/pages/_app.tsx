import "../styles/global.css";

import type { AppProps } from "next/app";
import StoreProvider from "../stores/store";
import { Layout } from "../shared/components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
