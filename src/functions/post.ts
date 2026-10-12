import { createServerFn } from "@tanstack/react-start";
import { allPosts } from "@/content";
import { postInputSchema, postQuerySchema } from "@/lib/server-input";

export const getPostBySlug = createServerFn({ method: "GET" })
  .validator(postInputSchema)
  .handler(({ data }) => {
    const post = allPosts.find((item) => item.slug === data.slug);
    if (!post) {
      return;
    }

    // The compiled MDX is loaded separately; do not serialize its raw source.
    return {
      badges: post.badges,
      description: post.description,
      lastModified: post.lastModified,
      publicAt: post.publicAt,
      readingTime: post.readingTime,
      slug: post.slug,
      tags: post.tags,
      title: post.title,
      words: post.words,
    };
  });

export const queryPosts = createServerFn({ method: "GET" })
  .validator(postQuerySchema)
  .handler(({ data: { limit, offset } }) => {
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

export type PostDetail = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;

export type QueryPostItem = Awaited<
  ReturnType<typeof queryPosts>
>["posts"][number];
