import Link from "next/link";
import { Post } from "~/types/post";
import { renderBadge } from "./Badge";

export default function PostListItem(props: { post: Post }) {
  const { post } = props;

  const readingTime = Number.parseInt(String(post.readingTime));

  return (
    <div>
      <Link as={`/posts/${post.fileName}`} href={`/posts/[slug]`}>
        <a className="text-xl leading-relaxed font-medium underline underline-offset-8 decoration-2 transition decoration-slate-700 hover:decoration-dotted">
          {post.data.title}
        </a>
      </Link>
      <div className="text-sm text-slate-700 dark:text-gray-200 flex justify-content space-x-3 mt-3">
        {post.data.badges && renderBadge(post.data.badges)}
        {post.data.publicAt && <div>{post.data.publicAt}</div>}
        {!!readingTime && <div>约 {readingTime} 分钟</div>}
      </div>
    </div>
  );
}
