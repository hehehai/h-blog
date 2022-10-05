import fs from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import matter from "gray-matter";
import type { NextPage } from "next";
import Container from "../components/Container";
import HomeAboutMe from "../components/HomeAboutMe";
import PostList from "../components/PostList";
import readingTime from "reading-time";
import NextLink from "next/link";
import { postFilePaths, POSTS_PATH } from "../utils/mdx";

const Home: NextPage = ({ posts, hasMore }: any) => {
  return (
    <Suspense fallback={null}>
      <Container>
        <HomeAboutMe />
        <div className="mt-14">
          <div className="mb-5 text-lg">新的文章</div>
          <PostList posts={posts} />
          {hasMore && (
            <div className="mt-8">
              <NextLink href="/posts">
                <a className="text-slate-700 dark:text-gray-400 underline underline-offset-8 decoration-2 decoration-slate-500 hover:decoration-dotted">
                  全部文章 _
                </a>
              </NextLink>
            </div>
          )}
        </div>
      </Container>
    </Suspense>
  );
};

export default Home;

export function getStaticProps() {
  const hasMore = postFilePaths.length > 5;
  const posts = postFilePaths.slice(0, 5).map(({ filePath }) => {
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

  return { props: { posts, hasMore } };
}
