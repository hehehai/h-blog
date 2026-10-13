import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ExploreMenu } from "@/components/shared/layout/explore-menu";
import Footer from "@/components/shared/layout/footer";
import Header from "@/components/shared/layout/header";
import { NavigationProgress } from "@/components/shared/layout/navigation-progress";
import { getCopyrightYear } from "@/functions/site";

const TRAILING_SLASHES = /\/+$/;

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  loader: () => getCopyrightYear(),
});

function SiteLayout() {
  const currentYear = Route.useLoaderData();
  const pathname = useRouterState({
    select: (state) =>
      (state.resolvedLocation?.pathname ?? state.location.pathname).replace(
        TRAILING_SLASHES,
        ""
      ) || "/",
  });
  // Key by the committed, canonical path, not a pending destination or an
  // asset-server trailing slash. Otherwise hydration discards the SSR body.

  return (
    <div className="site-layout">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <Header />
      <NavigationProgress />
      <main
        className="site-shell page-content page-enter"
        id="main-content"
        key={pathname}
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer currentYear={currentYear} />
      <ExploreMenu />
    </div>
  );
}
