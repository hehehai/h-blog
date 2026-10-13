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
