import { createRouter } from "@tanstack/react-router";
import { PageLoading } from "@/components/shared/layout/page-loading";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    defaultPendingComponent: PageLoading,
    defaultPendingMinMs: 150,
    defaultPendingMs: 200,
    defaultPreload: "intent",
    defaultViewTransition: true,
    routeTree,
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
