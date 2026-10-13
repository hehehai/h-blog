import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function NavigationProgress() {
  const [mounted, setMounted] = useState(false);
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  // Hash URLs can re-enter loading during hydration of prerendered pages.
  // Keep the first client render identical to the completed server render.
  useEffect(() => setMounted(true), []);
  return mounted && isLoading ? (
    <div
      aria-label="正在加载页面"
      className="navigation-progress"
      role="status"
    >
      <span />
    </div>
  ) : null;
}

export function ArticleLoading() {
  return (
    <div
      aria-label="正在加载文章"
      className="article-loading not-prose"
      role="status"
    >
      <span className="eyebrow">正在加载文章…</span>
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line" />
    </div>
  );
}

export function PageLoading() {
  return (
    <div aria-label="正在加载页面" className="page-loading" role="status">
      <span className="eyebrow">正在加载…</span>
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-subtitle" />
      <div className="skeleton skeleton-media" />
    </div>
  );
}
