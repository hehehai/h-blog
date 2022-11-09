import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-cmn-Hans">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="bg-zinc-50 h-full dark:bg-gradient-to-br dark:from-slate-900 dark:to-black dark:text-slate-50 min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
