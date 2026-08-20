import type { MDXComponents } from "mdx/types";
import type { ReactElement } from "react";
import { components as defaultComponents } from "./components";

type MDXPostComponent = (props: { components?: MDXComponents }) => ReactElement;

const postModules = import.meta.glob(
  ["/src/contents/posts/*.mdx", "/src/contents/posts/*.md"],
  {
    eager: true,
    import: "default",
  }
) as Record<string, MDXPostComponent>;

export default function MDXContent({
  slug,
  components = {},
}: {
  slug: string;
  components?: MDXComponents;
}) {
  const Component =
    postModules[`/src/contents/posts/${slug}.mdx`] ??
    postModules[`/src/contents/posts/${slug}.md`];

  if (!Component) {
    throw new Error(`No compiled MDX component found for post "${slug}"`);
  }

  return (
    <Component
      components={{
        ...defaultComponents,
        ...components,
      }}
    />
  );
}
