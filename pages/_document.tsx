import { cn } from "lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-CN" className={cn("bg-background font-sans antialiased")}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Regular.min.css"
        />
      </Head>
      <body className="min-h-screen bg-stone-50 h-full dark:bg-gradient-to-br dark:from-slate-900 dark:to-background dark:text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
