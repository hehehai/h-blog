"use server";

import { allPosts } from "@/content";

export async function getPostBySlug(slug: string) {
  const post = allPosts.find((post) => post.slug === slug);
  return post;
}

export async function queryPosts({
  limit = 10,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}) {
  const posts = allPosts.sort(
    (a, b) => b.publicAt.getTime() - a.publicAt.getTime()
  );
  const total = posts.length;

  const pagePosts = posts.slice(offset, offset + limit).map((post) => ({
    badges: post.badges,
    description: post.description,
    publicAt: post.publicAt,
    readingTime: post.readingTime,
    slug: post.slug,
    tags: post.tags,
    title: post.title,
  }));

  return { posts: pagePosts, total };
}

export type QueryPostItem = Awaited<
  ReturnType<typeof queryPosts>
>["posts"][number];
