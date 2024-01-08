import Container from "~/components/Container";
import { postMdxData } from "~/utils/mdx";
import PostList from "~/components/PostList";
import { Post } from "~/types/post";

export const config = {
  runtime: 'experimental-edge',
}

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

export function getStaticProps() {
  return { props: { posts: postMdxData() } };
}
