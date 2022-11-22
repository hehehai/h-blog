import { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { renderBadge } from "./Badge";
import rdTime from 'reading-time';

export default function PostListItem({ post }: { post: Post }) {
  const readingTime = Number.parseInt(String(rdTime(post.body.raw).minutes));

  return (
    <div>
      <Link as={`${post.slug}`} href={`/posts/[slug]`}>
        <a className="text-xl leading-relaxed font-medium underline underline-offset-8 decoration-2 decoration-slate-700 hover:decoration-dotted">
          {post.title}
        </a>
      </Link>
      <div className="text-sm text-slate-700 dark:text-gray-200 flex justify-content space-x-3 mt-3">
        {post.badges && renderBadge(post.badges)}
        {post.date && <div>{format(parseISO(post.date), "yyyy-MM-dd")}</div>}
        {!!readingTime && <div>约 {readingTime} 分钟</div>}
      </div>
    </div>
  );
}
