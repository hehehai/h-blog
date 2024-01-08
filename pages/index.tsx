import { Suspense } from "react";
import type { NextPage } from "next";
import Container from "~/components/Container";
import HomeAboutMe from "~/components/HomeAboutMe";
import PostList from "~/components/PostList";
import NextLink from "next/link";
import { postFilePaths, postMdxData } from "~/utils/mdx";
import { Post } from "~/types/post";

export const config = {
  runtime: 'experimental-edge',
}

const Home: NextPage<{
  posts: Post[];
  hasMore: boolean;
}> = ({ posts, hasMore }) => {
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

  return { props: { posts: postMdxData(5), hasMore } };
}
