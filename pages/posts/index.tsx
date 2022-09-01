import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Container from "../../components/Container";
import { postFilePaths, POSTS_PATH } from "../../utils/mdx";
import Link from "next/link";

export default function Index({ posts }: any) {
  return (
    <Container>
      <div>
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.filePath}>
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                href={`/posts/[slug]`}
              >
                <a>{post.data.title}</a>
              </Link>
            </div>
          ))
        ) : (
          <div>none</div>
        )}
        latest {posts.length} posts
      </div>
      <div>View all posts</div>
    </Container>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
