import Link from "next/link";
import PostList from "@/components/shared/post/post-list";
import ShortAboutMe from "@/components/shared/short-about-me";
import { queryPosts } from "@/functions/post";

export default async function Home() {
  const { posts, total } = await queryPosts({ limit: 6 });

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
              href="/posts"
            >
              全部文章 _
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
