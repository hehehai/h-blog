import { createServerFn } from "@tanstack/react-start";
import { allPosts } from "@/content";

export const getPostBySlug = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(({ data }) => allPosts.find((post) => post.slug === data.slug));

export const queryPosts = createServerFn({ method: "GET" })
  .validator((data: { limit?: number; offset?: number } = {}) => data)
  .handler(({ data: { limit = 10, offset = 0 } }) => {
    const posts = [...allPosts].sort(
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
  });

export type QueryPostItem = Awaited<
  ReturnType<typeof queryPosts>
>["posts"][number];
