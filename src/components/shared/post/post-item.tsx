import Link from "next/link";
import type { QueryPostItem } from "@/functions/post";
import PostTags from "./post-tags";

export default function ContentItem({ post }: { post: QueryPostItem }) {
  const readingTime = Number.parseInt(String(post.readingTime));

  return (
    <div>
      <Link
        className="font-medium text-xl leading-relaxed underline decoration-2 decoration-slate-700 underline-offset-8 transition hover:decoration-dotted"
        href={`/posts/${post.slug}`}
      >
        {post.title}
      </Link>
      <div className="justify-content mt-3 flex space-x-3 text-slate-700 text-sm dark:text-gray-200">
        <PostTags tags={post.badges} />
        {post.publicAt && <div>{post.publicAt.toLocaleDateString()}</div>}
        {!!readingTime && <div>约 {readingTime} 分钟</div>}
      </div>
    </div>
  );
}
