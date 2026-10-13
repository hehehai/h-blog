import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { ExploreMenu } from "@/components/shared/layout/explore-menu";
import Footer from "@/components/shared/layout/footer";
import Header from "@/components/shared/layout/header";
import { NavigationProgress } from "@/components/shared/layout/page-loading";
import { getCopyrightYear } from "@/functions/site";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  loader: () => getCopyrightYear(),
});

function SiteLayout() {
  const currentYear = Route.useLoaderData();
  const { pathname } = useLocation();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <Header />
      <NavigationProgress />
      <main
        className="page-content page-enter"
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
