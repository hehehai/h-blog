import type { MDXComponents } from "mdx/types";
import { Suspense } from "react";
import { getPostComponent } from "@/lib/mdx-posts";
import { components as defaultComponents } from "./components";

export default function MDXContent({
  slug,
  components = {},
}: {
  slug: string;
  components?: MDXComponents;
}) {
  const Component = getPostComponent(slug);
  return (
    // The route loader preloads this component before navigation commits.
    // On first hydration, Suspense keeps the complete SSR body while its JS loads.
    <Suspense fallback={null}>
      <Component components={{ ...defaultComponents, ...components }} />
    </Suspense>
  );
}
