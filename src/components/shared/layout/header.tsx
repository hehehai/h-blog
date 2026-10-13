import { Link, useLocation, useRouterState } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedLabel } from "@/components/shared/animated-label";
import { SiteLogo } from "@/components/shared/site-logo";
import { navMap } from "@/lib/config/nav";
import { siteConfig } from "@/lib/config/site";

const TRAILING_SLASHES = /\/+$/;

export default function Header() {
  const { pathname } = useLocation();
  // Static asset serving can add a trailing slash after prerendering.
  const pagePath = pathname.replace(TRAILING_SLASHES, "") || "/";
  const data = useRouterState({
    select: (state) => state.matches.at(-1)?.loaderData,
  });
  const [scrolled, setScrolled] = useState(false);
  const title =
    data &&
    typeof data === "object" &&
    "title" in data &&
    typeof data.title === "string"
      ? data.title
      : (navMap.find((item) => item.href === pagePath)?.text ?? "文章");
  useEffect(() => {
    const update = (): void => setScrolled(window.scrollY > 160);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const jumpToTop = (): void => {
    // The context button disappears near the top. Move focus first so that
    // hiding a focused button does not abort the browser's smooth scroll.
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      top: 0,
    });
  };
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="header-identity">
        <Link aria-label="Hehehai，返回首页" className="site-brand" to="/">
          <SiteLogo />
          <span className="brand-name">
            Hehehai<span className="text-muted-foreground">.cn</span>
          </span>
        </Link>
        <button
          aria-label={`返回页面顶部：${title}`}
          className="header-context"
          disabled={!scrolled}
          onClick={jumpToTop}
          tabIndex={scrolled ? 0 : -1}
          type="button"
        >
          <span>{title}</span>
          <ArrowUp aria-hidden="true" size={14} />
        </button>
      </div>
      <a
        className="button-link header-contact animated-link"
        href={`mailto:${siteConfig.email}`}
      >
        <AnimatedLabel text="聊聊想法" />
        <ArrowUpRight aria-hidden="true" size={14} />
      </a>
    </header>
  );
}
