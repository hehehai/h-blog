import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import PostList from "@/components/shared/post/post-list";
import { ProjectShowcase } from "@/components/shared/project/project-showcase";
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
    <div className="home-page">
      <ProjectShowcase />
      <ShortAboutMe />
      <section className="home-posts">
        <div className="section-heading">
          <div>
            <p className="eyebrow">笔记与思考</p>
            <h2>最近的记录</h2>
          </div>
          {hasMore && (
            <Link className="text-link" to="/posts">
              全部 {total} 篇 <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          )}
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
