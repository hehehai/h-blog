import Container from "~/components/Container";
import PostList from "~/components/PostList";
import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

export default function Index({ posts }: { posts: Post[] }) {
  return (
    <Container>
      <div>
        <div className="mb-3">共 {posts.length} 篇</div>
        <PostList posts={posts} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}
