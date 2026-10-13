import { createRouter } from "@tanstack/react-router";
import { preloadPostFromPath } from "@/lib/mdx-posts";
import { routeTree } from "./routeTree.gen";

export async function getRouter() {
  const router = createRouter({
    // Keep the current page while the next route's data and MDX load.
    // NavigationProgress supplies lightweight feedback without blanking content.
    defaultPreload: "intent",
    defaultViewTransition: true,
    routeTree,
    scrollRestoration: true,
  });

  // Start awaits this factory before hydrating its router. Resolve the initial
  // article's JS first so hydration never replaces completed SSR prose with a
  // suspended client boundary. Ordinary navigation uses the route loader.
  if (typeof window !== "undefined") {
    await preloadPostFromPath(window.location.pathname);
  }
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: Awaited<ReturnType<typeof getRouter>>;
  }
}
