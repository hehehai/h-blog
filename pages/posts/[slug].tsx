import { Mdx } from "~/components/MDX/MDXComponents";

import Container from "~/components/Container";
import { renderBadge } from "~/components/Badge";
import { renderTag } from "~/components/Tag";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import rdTime from "reading-time";
import { format, parseISO } from "date-fns";
import { Giscus } from "~/components/Giscus";
import { useTheme } from "next-themes";

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

export default function Post({ post }: { post: Post }) {
  const { resolvedTheme } = useTheme();

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
            <Mdx code={post.body.code} />
          </article>
        </main>
        <div className="mt-12">
          <Giscus
            repo="hehehai/h-blog"
            repoId="R_kgDOH7HVQQ"
            category="Announcements"
            categoryId="DIC_kwDOH7HVQc4CRL4m"
            theme={resolvedTheme === "dark" ? "dark" : "light"}
          />
        </div>
      </div>
    </Container>
  );
}
