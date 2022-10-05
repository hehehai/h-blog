import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Container from "../../components/Container";
import { postFilePaths, POSTS_PATH } from "../../utils/mdx";
import PostList from "../../components/PostList";
import readingTime from "reading-time";

export default function Index({ posts }: any) {
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
  const posts = postFilePaths.map(({ filePath }) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      readingTime: readingTime(content).minutes,
      filePath,
      fileName: filePath.replace(/\.mdx?$/, ""),
    };
  });

  return { props: { posts } };
}
