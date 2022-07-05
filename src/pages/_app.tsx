import { withTRPC } from "@trpc/next";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "./api/trpc/[trpc]";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = "/api/trpc";

    return { url };
  },
  ssr: false,
})(MyApp);
