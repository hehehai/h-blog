import { defineCollection, defineConfig } from "@content-collections/core";
import readingTime from "reading-time";
import { z } from "zod";
import { getPostLastModified } from "./scripts/content";
import { getPostSlug } from "./src/lib/post-path";

const posts = defineCollection({
  directory: "src/contents/posts",
  include: "**/*.{mdx,md}",
  name: "posts",
  schema: z.object({
    badges: z
      .string()
      .transform((badges) => badges.split(","))
      .optional(),
    content: z.string().optional(),
    description: z.string().min(1),
    publicAt: z.iso
      .date()
      .transform((date) => new Date(`${date}T00:00:00.000Z`)),
    tags: z
      .string()
      .transform((tags) => tags.split(","))
      .optional(),
    title: z.string().min(1),
  }),
  transform: async (document) => {
    try {
      const slug = getPostSlug(document._meta.filePath);

      // Do not persist a path-only cache: Git history can change without the
      // source path changing, and a new post may have no history yet.
      const lastModified = await getPostLastModified(
        `src/contents/posts/${document._meta.filePath}`,
        document.publicAt
      );

      const readingInfo = readingTime(document.content ?? "");

      return {
        ...document,
        lastModified,
        readingTime: Math.round(readingInfo.minutes),
        slug,
        words: readingInfo.words,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export default defineConfig({
  content: [posts],
});
