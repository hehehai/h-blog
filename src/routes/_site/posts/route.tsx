import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/posts")({
  component: PostsLayout,
});

function PostsLayout() {
  return <Outlet />;
}
