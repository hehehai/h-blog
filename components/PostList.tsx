import { Post } from "~/types/post";
import PostListItem from "./PostListItem";

export default function PostList({ posts }: {posts: Post[]}) {
  const renderPosts = () => {
    return posts.map((post) => (
      <PostListItem key={post.filePath} post={post} />
    ));
  };

  return (
    <div className="space-y-8">{posts.length > 0 ? renderPosts() : <span>Empty Posts</span>}</div>
  );
}
