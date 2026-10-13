import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import exampleComponents from "@/components/content";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import MDXContent from "@/components/shared/mdx";
import { ArticleOutline } from "@/components/shared/post/article-outline";
import PostTags from "@/components/shared/post/post-tags";
import { getPostBySlug, type PostDetail } from "@/functions/post";
import { siteConfig } from "@/lib/config/site";
import { formatPostDate } from "@/lib/date";
import { hasPostContent, preloadPostContent } from "@/lib/mdx-posts";
import { isPostSlug } from "@/lib/post-path";
import { absoluteUrl, createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/_site/posts/$slug")({
  component: PostPage,
  head: ({ loaderData }) => {
    const post = loaderData as PostDetail | undefined;

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
        author: post.source
          ? {
              "@type": post.source.name === "Dub" ? "Organization" : "Person",
              name: post.source.name,
              url: post.source.url,
            }
          : { "@type": "Person", name: "一块木头", url: siteConfig.host },
        ...(post.source
          ? {
              isBasedOn: post.source.url,
              translator: {
                "@type": "Person",
                name: "一块木头",
                url: siteConfig.host,
              },
            }
          : {}),
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
  loader: async ({ params }): Promise<PostDetail> => {
    if (!(isPostSlug(params.slug) && hasPostContent(params.slug))) {
      throw notFound();
    }

    const [post] = await Promise.all([
      getPostBySlug({ data: { slug: params.slug } }),
      preloadPostContent(params.slug),
    ]);
    if (!post) {
      throw notFound();
    }
    return post;
  },
});

function PostPage() {
  const post = Route.useLoaderData() as PostDetail;

  return (
    <div className="article-page">
      <header className="article-heading">
        <Link className="article-back text-link" to="/posts">
          <ArrowLeft aria-hidden="true" size={15} />
          全部文章
        </Link>
        <PostTags className="justify-center" tags={post.tags} />
        <h1>{post.title}</h1>
        <div className="post-meta justify-center">
          <time dateTime={new Date(post.publicAt).toISOString()}>
            {formatPostDate(post.publicAt)}
          </time>
          <span>{post.readingTime} 分钟阅读</span>
          {post.badges?.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
        <p className="article-description">{post.description}</p>
        <div className="article-author">
          <AuthorAvatar />
          <Link to="/about">
            一块木头<span> · {post.source ? "翻译与整理" : "Hehehai"}</span>
          </Link>
        </div>
      </header>
      {(post.source || post.notice) && (
        <aside aria-label="阅读说明" className="article-context">
          {post.source && (
            <p>
              原文来自{" "}
              <a
                href={post.source.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {post.source.name}
                <ArrowUpRight aria-hidden="true" size={13} />
              </a>
              ，译文中的“我”“我们”指原作者。
            </p>
          )}
          {post.notice && <p>{post.notice}</p>}
        </aside>
      )}
      <div className="article-layout">
        <ArticleOutline slug={post.slug} />
        <article
          className="article-body prose dark:prose-invert"
          id="article-body"
        >
          <MDXContent components={exampleComponents} slug={post.slug} />
        </article>
      </div>
      <footer className="article-end">
        <p className="eyebrow">感谢阅读</p>
        <p>每一次探索，都值得记录。</p>
        <div>
          <Link className="text-link" to="/posts">
            <ArrowLeft aria-hidden="true" size={15} />
            继续阅读
          </Link>
          <a className="text-link" href={`mailto:${siteConfig.email}`}>
            交流想法 <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
}
