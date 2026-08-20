import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { $ } from "zx";

const mdxFileRegex = /\.mdx?$/;

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
    publicAt: z.string().transform((date) => new Date(date)),
    tags: z
      .string()
      .transform((tags) => tags.split(","))
      .optional(),
    title: z.string().min(1),
  }),
  transform: async (document, context) => {
    try {
      const slug = document._meta.fileName.replace(mdxFileRegex, "");

      const lastModified = await context.cache(
        document._meta.filePath,
        async (filePath) => {
          const { stdout } =
            await $`git log -1 --format=%ai -- src/contents/posts/${filePath}`;
          return new Date(stdout.toString().trim());
        }
      );

      const mdx = await compileMDX(context, document, {
        rehypePlugins: [
          rehypeSlug,
          rehypeCodeTitles,
          rehypeHighlight,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
        remarkPlugins: [remarkGfm],
      });

      const readingInfo = readingTime(mdx);

      return {
        ...document,
        lastModified,
        mdx,
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
