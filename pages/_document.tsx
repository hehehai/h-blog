import { cn } from "lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="zh-cmn-Hans"
      className={cn(
        "bg-zinc-50 h-full dark:bg-gradient-to-br dark:from-slate-900 dark:to-black dark:text-slate-50 bg-background font-sans antialiased"
      )}
    >
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
