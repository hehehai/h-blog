import { cn } from "lib/utils";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
        {process.env.NODE_ENV === "production" && (
          <>
            {" "}
            <Script
              id="openpanel"
              src="https://openpanel.dev/op.js"
              defer
              async
              strategy="afterInteractive"
            />
            <Script id="openpanel-client" strategy="afterInteractive">
              {`
      window.op = window.op || function (...args) { (window.op.q = window.op.q || []).push(args); };
      window.op('ctor', {
        clientId: '1be734c9-2c9f-4451-ae69-745c89ca59cd',
        trackScreenViews: true,
        trackOutgoingLinks: true,
        trackAttributes: true,
      });`}
            </Script>
          </>
        )}
      </Head>
      <body className="text-foreground dark:to-background h-full min-h-screen bg-stone-50 dark:bg-gradient-to-br dark:from-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
