import { MDXContent as MDXReact } from "@content-collections/mdx/react";
import type { MDXComponents } from "mdx/types";
import { Suspense } from "react";
import { components as defaultComponents } from "./components";

export default function MDXContent({
  code,
  components = {},
}: {
  code: string;
  components?: MDXComponents;
}) {
  return (
    <Suspense fallback={null}>
      <MDXReact
        code={code}
        components={{
          ...defaultComponents,
          ...components,
        }}
      />
    </Suspense>
  );
}
