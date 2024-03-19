import { cn } from "lib/utils";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const GoogleGA = "G-S6MF4DWGZW";

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
      <body className="text-foreground dark:to-background h-full min-h-screen bg-stone-50 dark:bg-gradient-to-br dark:from-slate-900">
        <Main />
        <NextScript />
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GoogleGA}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GoogleGA}');
        `}
      </Script>
    </Html>
  );
}
