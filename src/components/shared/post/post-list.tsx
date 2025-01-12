import type { QueryPostItem } from '@/functions/post';
import PostItem from './post-item';

export default function PostList({ posts }: { posts: QueryPostItem[] }) {
  return (
    <div className="space-y-8">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.slug} post={post} />)
      ) : (
        <div className="text-center text-slate-700 text-sm dark:text-gray-200">
          暂无文章
        </div>
      )}
    </div>
  );
}
