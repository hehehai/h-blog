import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "~/utils/tools";

import EmbedStackblitz from "./EmbedStackblitz";
import SandpackBlock from "./SandpackBlock";
import CustomLink from "./CustomLink";

function Callout(props: any) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

const components = {
  a: CustomLink,
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn(
        "rounded-md lg:rounded-lg lg:border border-slate-200/10",
        className
      )}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-slate-200 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 border-t border-slate-300 p-0 even:bg-slate-100",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-slate-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border border-slate-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 mb-4 overflow-x-auto rounded-lg bg-slate-800 dark:bg-[#1d1f28] py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative text-secondary dark:text-secondary-dark bg-slate-300 bg-opacity-30 px-1.5 py-0.5 rounded-md no-underline break-words",
        className
      )}
      {...props}
    />
  ),
  Callout,
  EmbedStackblitz,
  SandpackBlock,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const MDXCoreComponent = useMDXComponent(code);

  return (
    <div className="mdx">
      <MDXCoreComponent components={components} />
    </div>
  );
}
