import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import Providers from "@/components/shared/providers";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const themeScript = `(() => {
  try {
    const storedTheme = localStorage.getItem("theme") || "system";
    const resolvedTheme = storedTheme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : storedTheme;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {}
})();`;

export const metadata: Metadata = {
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
  },
  keywords: siteConfig.keywords,
  openGraph: {
    description: siteConfig.description,
    images: [`${siteConfig.host}/favicon.svg`],
    siteName: siteConfig.title,
    title: siteConfig.title,
    url: siteConfig.host,
  },
  title: {
    default: siteConfig.title + siteConfig.shortTitle,
    template: `%s | ${siteConfig.title}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterName,
    creatorId: siteConfig.twitter,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      className={cn("bg-background font-sans antialiased", geistMono.variable)}
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <link
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Regular.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="h-full min-h-screen bg-stone-50 text-foreground dark:bg-gradient-to-br dark:from-slate-900 dark:to-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
