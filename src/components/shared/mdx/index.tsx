import { MDXContent as MDXReact } from '@content-collections/mdx/react';
import type { MDXComponents } from 'mdx/types';
import { components as defaultComponents } from './components';

export default function MDXContent({
  code,
  components = {},
}: { code: string; components?: MDXComponents }) {
  return (
    <MDXReact
      code={code}
      components={{
        ...defaultComponents,
        ...components,
      }}
    />
  );
}
