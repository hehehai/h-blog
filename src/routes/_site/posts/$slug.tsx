import { createFileRoute, notFound } from "@tanstack/react-router";
import exampleComponents from "@/components/content";
import MDXContent from "@/components/shared/mdx";
import PostTags from "@/components/shared/post/post-tags";
import type { Post } from "@/content";
import { getPostBySlug } from "@/functions/post";
import { siteConfig } from "@/lib/config/site";
import { absoluteUrl, createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/_site/posts/$slug")({
  component: PostPage,
  head: ({ loaderData }) => {
    const post = loaderData as Post | undefined;

    if (!post) {
      return { meta: [{ title: "文章不存在" }] };
    }

    const path = `/posts/${post.slug}`;
    const title = `${post.title} | ${siteConfig.title}`;
    const seo = createSeoHead({
      description: post.description,
      path,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        author: { "@type": "Person", name: "一块木头", url: siteConfig.host },
        dateModified: new Date(post.lastModified).toISOString(),
        datePublished: new Date(post.publicAt).toISOString(),
        description: post.description,
        headline: post.title,
        image: absoluteUrl("/favicon.svg"),
        inLanguage: "zh-CN",
        isPartOf: {
          "@type": "Blog",
          name: siteConfig.title,
          url: siteConfig.host,
        },
        keywords: post.tags,
        mainEntityOfPage: { "@id": absoluteUrl(path), "@type": "WebPage" },
        url: absoluteUrl(path),
      },
      title,
      type: "article",
    });

    return {
      ...seo,
      meta: [
        ...seo.meta,
        {
          content: new Date(post.publicAt).toISOString(),
          property: "article:published_time",
        },
        {
          content: new Date(post.lastModified).toISOString(),
          property: "article:modified_time",
        },
        ...(post.tags ?? []).map((tag) => ({
          content: tag,
          property: "article:tag",
        })),
      ],
    };
  },
  loader: async ({ params }): Promise<Post> => {
    const post = await getPostBySlug({ data: { slug: params.slug } });
    if (!post) {
      throw notFound();
    }
    return post;
  },
});

function PostPage() {
  const post = Route.useLoaderData() as Post;

  return (
    <div>
      <div className="mb-10">
        <div className="mb-4 font-medium text-2xl leading-relaxed underline decoration-2 decoration-slate-700 underline-offset-8 md:text-3xl">
          {post.title}
        </div>
        <div className="justify-content mt-1.5 flex space-x-2 text-slate-700 text-sm dark:text-gray-200">
          <PostTags isSimple tags={post.tags} title="标签:" />
        </div>
        <div className="justify-content mt-1.5 flex space-x-2 text-slate-700 text-sm dark:text-gray-200">
          <PostTags tags={post.badges} />
          {post.publicAt && <div>{post.publicAt.toLocaleDateString()}</div>}
          {!!post.readingTime && <div>约 {post.readingTime} 分钟</div>}
        </div>
      </div>
      <main>
        <article className="prose prose-slate dark:prose-invert mt-4 w-full max-w-none">
          <MDXContent code={post.mdx} components={exampleComponents} />
        </article>
      </main>
    </div>
  );
}
