import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import highlightCss from "highlight.js/styles/atom-one-dark-reasonable.css?url";
import ErrorPage from "@/components/shared/error-page";
import Providers from "@/components/shared/providers";
import { siteConfig } from "@/lib/config/site";
import { createWebsiteStructuredData } from "@/lib/seo";
import { cn } from "@/lib/utils";
import appCss from "@/styles/globals.css?url";

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

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
  head: () => ({
    links: [
      { href: appCss, rel: "stylesheet" },
      { href: highlightCss, rel: "stylesheet" },
      { href: "/favicon.svg", rel: "icon" },
      { href: "/manifest.webmanifest", rel: "manifest" },
      {
        crossOrigin: "anonymous",
        href: "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Regular.min.css",
        rel: "stylesheet",
      },
    ],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { content: siteConfig.description, name: "description" },
      { content: siteConfig.keywords.join(","), name: "keywords" },
      { title: `${siteConfig.title} ${siteConfig.shortTitle}` },
    ],
    scripts: [
      { children: themeScript },
      {
        children: JSON.stringify(createWebsiteStructuredData()).replaceAll(
          "<",
          "\\u003c"
        ),
        type: "application/ld+json",
      },
    ],
  }),
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <html
      className={cn("bg-background font-sans antialiased")}
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body className="h-full min-h-screen bg-stone-50 text-foreground dark:bg-gradient-to-br dark:from-slate-900 dark:to-background">
        <Providers>
          <Outlet />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-slate-950">
      <div className="text-center">
        <p className="font-semibold text-base text-gray-900 dark:text-gray-100">
          404
        </p>
        <h1 className="mt-4 font-bold text-3xl text-gray-900 tracking-tight sm:text-5xl dark:text-gray-100">
          未找到页面
        </h1>
        <p className="mt-6 text-base text-gray-600 leading-7 dark:text-gray-300">
          抱歉!我们找不到您要查找的页面
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            className="rounded-md bg-primary px-3.5 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-primary/90"
            href="/"
          >
            返回首页
          </a>
        </div>
      </div>
    </main>
  );
}
