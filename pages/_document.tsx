import { cn } from "lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="zh-CN"
      className={cn("bg-background font-sans antialiased")}
    >
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="min-h-screen bg-zinc-50 h-full dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
