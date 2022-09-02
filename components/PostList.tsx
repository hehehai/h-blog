import PostListItem from "./PostListItem";

export default function PostList({ posts }: any) {
  const renderPosts = () => {
    return posts.map((post: any) => (
      <PostListItem key={post.filePath} post={post} />
    ));
  };

  return (
    <div className="space-y-5">{posts.length > 0 ? renderPosts() : <span>Empty Posts</span>}</div>
  );
}
