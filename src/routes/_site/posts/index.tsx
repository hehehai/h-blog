import { createFileRoute } from "@tanstack/react-router";
import { PageHeading } from "@/components/shared/page-heading";
import { PostBrowser } from "@/components/shared/post/post-browser";
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
  const { posts } = Route.useLoaderData();

  return (
    <div className="collection-page">
      <PageHeading
        description="开发实践、交互设计与阅读整理。完整的教程和阶段性笔记，都在这里。"
        eyebrow="实践记录与译文"
        title="文章与笔记。"
      />
      <PostBrowser posts={posts} />
    </div>
  );
}
