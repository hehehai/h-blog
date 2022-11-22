import Head from "next/head";
import Giscus from "@giscus/react";
import mdxComponents from "~/components/MDX/MDXComponents";
import { useMDXComponent } from "next-contentlayer/hooks";

import Container from "~/components/Container";
import { renderBadge } from "~/components/Badge";
import { renderTag } from "~/components/Tag";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import rdTime from "reading-time";
import { format, parseISO } from "date-fns";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slugAsParams === params?.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.slug);

  return {
    paths,
    fallback: false,
  };
}

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  ...mdxComponents,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

export default function Post({ post }: { post: Post }) {
  const MdxComponent = useMDXComponent(post.body.code);

  const readingTime = Number.parseInt(String(rdTime(post.body.raw).minutes));

  const seoMeta = {
    title: post.title,
    description: post.description,
    date: post.date,
  };

  return (
    <Container {...seoMeta}>
      <div>
        <div className="mb-10">
          <div className="text-2xl md:text-3xl leading-relaxed font-medium underline underline-offset-8 decoration-2 decoration-slate-700 mb-4">
            {post.title}
          </div>
          <div className="text-sm text-slate-700 dark:text-gray-200 flex justify-content space-x-2 mt-1.5">
            {post.tags && renderTag(post.tags)}
          </div>
          <div className="text-sm text-slate-700 dark:text-gray-200 flex justify-content space-x-2 mt-1.5">
            {post.badges && renderBadge(post.badges)}
            {post.date && (
              <div>{format(parseISO(post.date), "yyyy-MM-dd")}</div>
            )}
            {!!readingTime && <div>约 {readingTime} 分钟</div>}
          </div>
        </div>
        <main>
          <article className="w-full mt-4 prose dark:prose-invert max-w-none">
            {/* <MDXRemote {...html} components={components} /> */}
            <MdxComponent components={components} />
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
