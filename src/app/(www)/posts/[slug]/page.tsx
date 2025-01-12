import exampleComponents from '@/components/content';
import MDXContent from '@/components/shared/mdx';
import PostTags from '@/components/shared/post/post-tags';
import { getPostBySlug } from '@/functions/post';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getPost = cache(getPostBySlug);

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: '文章不存在',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <div className="mb-10">
        <div className="mb-4 font-medium text-2xl leading-relaxed underline decoration-2 decoration-slate-700 underline-offset-8 md:text-3xl">
          {post.title}
        </div>
        <div className="justify-content mt-1.5 flex space-x-2 text-slate-700 text-sm dark:text-gray-200">
          <PostTags title="标签:" tags={post.tags} isSimple />
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
