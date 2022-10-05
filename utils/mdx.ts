import fs from 'node:fs'
import path from 'node:path'
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'data/posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((filePath) => /\.mdx?$/.test(filePath))
  .map(filePath => ({
    filePath,
    birthtimeMs: fs.statSync(path.join(POSTS_PATH, filePath))?.birthtimeMs
  }))
  // new is first
  .sort((a, b) => b.birthtimeMs - a.birthtimeMs)

export async function mdxToHtml(content: string) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypeHighlight,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ]
      ],
      format: 'mdx'
    }
  });

  return {
    html: mdxSource,
    wordCount: content.split(/\s+/gu).length,
    readingTime: readingTime(content).minutes
  };
}
