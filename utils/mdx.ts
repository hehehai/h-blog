import fs from 'node:fs'
import path from 'node:path'
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import matter from 'gray-matter';
import { Post } from '~/types/post';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'data/posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((filePath) => /\.mdx?$/.test(filePath))

export const postMdxData = (hasContent = true, count = 999) : Post[] => {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content: hasContent ? content : '',
      data,
      publicAtMs: +new Date(data.publicAt ?? 0),
      readingTime: readingTime(content).minutes,
      filePath,
      fileName: filePath.replace(/\.mdx?$/, ""),
    };
  })
  .sort((a, b) => {
    return b.publicAtMs - a.publicAtMs
  })

  return posts.slice(0, count);
} 

export async function mdxToHtml(content: string) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
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
