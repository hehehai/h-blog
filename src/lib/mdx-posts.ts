import { lazyRouteComponent } from "@tanstack/react-router";
import type { MDXComponents } from "mdx/types";
import type { ReactElement } from "react";
import { getPostSlug, isPostSlug } from "@/lib/post-path";

const POST_PATH = /^\/posts\/([^/]+)\/?$/;

type MDXPostComponent = (props: { components?: MDXComponents }) => ReactElement;
const postModules = import.meta.glob<MDXPostComponent>(
  ["/src/contents/posts/**/*.mdx", "/src/contents/posts/**/*.md"],
  { import: "default" }
);

// TanStack's public preloadable component wrapper shares the same import for
// loader intent-prefetch, navigation, SSR and hydration. Each article stays split.
const postComponents = new Map(
  Object.entries(postModules).map(([path, load]) => [
    getPostSlug(path),
    lazyRouteComponent(async () => ({ default: await load() })),
  ])
);

export function hasPostContent(slug: string): boolean {
  return postComponents.has(slug);
}

export function getPostComponent(slug: string) {
  const Component = postComponents.get(slug);
  if (!Component) {
    throw new Error(`No compiled MDX component found for post "${slug}"`);
  }
  return Component;
}

export async function preloadPostContent(slug: string): Promise<void> {
  await getPostComponent(slug).preload?.();
}

export async function preloadPostFromPath(pathname: string): Promise<void> {
  const match = pathname.match(POST_PATH);
  if (!match) {
    return;
  }
  let slug: string;
  try {
    slug = decodeURIComponent(match[1]);
  } catch {
    return;
  }
  if (isPostSlug(slug) && hasPostContent(slug)) {
    await preloadPostContent(slug);
  }
}
