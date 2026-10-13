import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { QueryPostItem } from "@/functions/post";
import { formatPostDate } from "@/lib/date";

export default function PostItem({
  post,
  headingLevel = "h3",
}: {
  post: QueryPostItem;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="post-item">
      <Link
        className="post-item-link"
        params={{ slug: post.slug }}
        to="/posts/$slug"
      >
        <div className="post-item-content">
          <div className="post-meta">
            <time dateTime={new Date(post.publicAt).toISOString()}>
              {formatPostDate(post.publicAt)}
            </time>
            <span>{post.tags?.[0] || "技术笔记"}</span>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
          <Heading>{post.title}</Heading>
          <p>{post.description}</p>
          {post.badges?.includes("译文") && (
            <span className="post-kind">译文整理</span>
          )}
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="post-item-arrow"
          size={21}
        />
      </Link>
    </article>
  );
}
