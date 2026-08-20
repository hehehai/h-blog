import { createFileRoute, Link } from "@tanstack/react-router";
import PostList from "@/components/shared/post/post-list";
import ShortAboutMe from "@/components/shared/short-about-me";
import { queryPosts } from "@/functions/post";
import { siteConfig } from "@/lib/config/site";
import { createSeoHead } from "@/lib/seo";

const siteTitle = siteConfig.title;

export const Route = createFileRoute("/_site/")({
  component: Home,
  head: () =>
    createSeoHead({
      description: "记录全栈开发、前端工程与用户界面设计的个人博客。",
      path: "/",
      title: siteTitle,
    }),
  loader: () => queryPosts({ data: { limit: 6 } }),
});

function Home() {
  const { posts, total } = Route.useLoaderData();
  const hasMore = total > 6;

  return (
    <div>
      <ShortAboutMe />
      <div className="mt-14">
        <div className="mb-5 text-lg">新的文章</div>
        <PostList posts={posts} />
        {hasMore ? (
          <div className="mt-8">
            <Link
              className="text-slate-700 underline decoration-2 decoration-slate-500 underline-offset-8 hover:decoration-dotted dark:text-gray-400"
              to="/posts"
            >
              全部文章 _
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
