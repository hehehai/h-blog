import type { MDXComponents } from "mdx/types";
import { lazy, type ReactElement, Suspense } from "react";
import { ArticleLoading } from "@/components/shared/layout/page-loading";
import { getPostSlug } from "@/lib/post-path";
import { components as defaultComponents } from "./components";

type MDXPostComponent = (props: { components?: MDXComponents }) => ReactElement;

const postModules = import.meta.glob<MDXPostComponent>(
  ["/src/contents/posts/**/*.mdx", "/src/contents/posts/**/*.md"],
  { import: "default" }
);

// Create lazy component identities once, not on each render. Vite tracks the
// source modules for HMR, while production builds split them by article.
const postComponents = new Map(
  Object.entries(postModules).map(([filePath, load]) => [
    getPostSlug(filePath),
    lazy(async () => ({ default: await load() })),
  ])
);

export default function MDXContent({
  slug,
  components = {},
}: {
  slug: string;
  components?: MDXComponents;
}) {
  const Component = postComponents.get(slug);

  if (!Component) {
    throw new Error(`No compiled MDX component found for post "${slug}"`);
  }

  return (
    <Suspense fallback={<ArticleLoading />}>
      <Component
        components={{
          ...defaultComponents,
          ...components,
        }}
      />
    </Suspense>
  );
}
