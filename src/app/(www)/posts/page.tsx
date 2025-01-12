import PostList from '@/components/shared/post/post-list';
import { queryPosts } from '@/functions/post';

export default async function Posts() {
  const { posts, total } = await queryPosts({ limit: 1000 });

  return (
    <div>
      <div className="mb-3">共 {total} 篇</div>
      <PostList posts={posts} />
    </div>
  );
}
