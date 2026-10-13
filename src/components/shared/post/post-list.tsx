import type { QueryPostItem } from "@/functions/post";
import PostItem from "./post-item";

export default function PostList({
  posts,
  headingLevel = "h3",
}: {
  posts: QueryPostItem[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem headingLevel={headingLevel} key={post.slug} post={post} />
        ))
      ) : (
        <p className="empty-state">没有找到匹配的文章，试试其他关键词。</p>
      )}
    </div>
  );
}
