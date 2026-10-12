import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/shared/layout/footer";
import Header from "@/components/shared/layout/header";
import NavBar from "@/components/shared/layout/nav-bar";
import { getCopyrightYear } from "@/functions/site";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  loader: () => getCopyrightYear(),
});

function SiteLayout() {
  const currentYear = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <Header />
      <NavBar />
      <div className="my-4">
        <Outlet />
      </div>
      <Footer currentYear={currentYear} />
    </div>
  );
}
