import "../styles/global.css";

import type { AppProps } from "next/app";
import StoreProvider from "../providers/user";
import { Layout } from "../shared/components/Layout/Layout";

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
