import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ElementPreCodeProps extends HTMLAttributes<HTMLPreElement> {
  isLink: boolean;
}

export default function ElementPreCode({
  isLink,
  className,
  ...props
}: ElementPreCodeProps) {
  return (
    <div className="relative">
      <pre
        className={cn(
          "wrap-break-word block rounded-xl px-0 text-secondary no-underline dark:bg-slate-900 dark:text-secondary-foreground",
          {
            "bg-highlight py-0 dark:bg-highlight-dark": isLink,
            "bg-opacity-60 py-px": !isLink,
          },
          className
        )}
        {...props}
      />
    </div>
  );
}
