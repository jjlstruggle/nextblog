import "../styles/globals.css";
import "@style/post.less";
import type { AppProps } from "next/app";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Head from "next/head";
import { LegacyRef, useRef } from "react";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  const appRef: LegacyRef<HTMLDivElement> = useRef(null);

  return (
    <div
      className="w-screen h-screen overflow-y-auto overflow-x-hidden"
      ref={appRef}
    >
      <Head>
        <title>摸鱼波比の博客</title>
        <meta name="description" content="blog belone to saga" />
        <meta name="referrer" content="no-referrer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header app={appRef} />
      <Component {...pageProps} app={appRef} />
      <Footer />
    </div>
  );
}

export default MyApp;
