import { createFileRoute } from "@tanstack/react-router";
import PostList from "@/components/shared/post/post-list";
import { queryPosts } from "@/functions/post";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/_site/posts/")({
  component: Posts,
  head: () =>
    createSeoHead({
      description: "浏览 Hehehai @一块木头 发布的全部技术文章。",
      path: "/posts",
      title: "文章 | Hehehai @一块木头",
    }),
  loader: () => queryPosts({ data: { limit: 1000 } }),
});

function Posts() {
  const { posts, total } = Route.useLoaderData();

  return (
    <div>
      <div className="mb-3">共 {total} 篇</div>
      <PostList posts={posts} />
    </div>
  );
}
