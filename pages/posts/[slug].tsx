import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import Head from "next/head";
import Giscus from "@giscus/react";
import mdxComponents from "../../components/MDX/MDXComponents";
import { mdxToHtml, postFilePaths, POSTS_PATH } from "../../utils/mdx";

import Container from "../../components/Container";
import { renderBadge } from "../../components/Badge";
import { renderTag } from "../../components/Tag";
import { PostMatter } from "../interface/post";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  ...mdxComponents,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

export default function Post({
  html,
  frontMatter,
  readingTime,
}: {
  html: any;
  frontMatter: PostMatter;
  readingTime: string;
}) {
  let readingTimeNum = Number.parseInt(readingTime);

  const seoMeta = {
    title: frontMatter.title,
    description: frontMatter.description,
    date: frontMatter.publicAt,
  };

  return (
    <Container {...seoMeta}>
      <div>
        <div className="mb-10">
          <div className="text-2xl md:text-3xl leading-relaxed font-medium underline underline-offset-8 decoration-2 decoration-slate-700 mb-4">
            {frontMatter.title}
          </div>
          <div className="text-sm text-slate-700 dark:text-gray-200 flex justify-content space-x-2 mt-1.5">
            {frontMatter.tags && renderTag(frontMatter.tags)}
          </div>
          <div className="text-sm text-slate-700 dark:text-gray-200 flex justify-content space-x-2 mt-1.5">
            {frontMatter.badges && renderBadge(frontMatter.badges)}
            {frontMatter.publicAt && <div>{frontMatter.publicAt}</div>}
            {!!readingTimeNum && <div>约 {readingTimeNum} 分钟</div>}
          </div>
        </div>
        <main>
          <article className="w-full mt-4 prose dark:prose-invert max-w-none">
            <MDXRemote {...html} components={components} />
          </article>
        </main>
        <div className="mt-12">
          <Giscus
            id="comments"
            repo="hehehai/h-blog"
            repoId="R_kgDOH7HVQQ"
            category="Announcements"
            categoryId="DIC_kwDOH7HVQc4CRL4m"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="zh-CN"
            loading="lazy"
          />
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const htmlData = await mdxToHtml(content);

  return {
    props: {
      ...htmlData,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((filePath) => filePath.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
