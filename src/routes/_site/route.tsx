import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/shared/layout/footer";
import Header from "@/components/shared/layout/header";
import NavBar from "@/components/shared/layout/nav-bar";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <Header />
      <NavBar />
      <div className="my-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
