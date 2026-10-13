import type { JSX } from "react";
import { cn } from "@/lib/utils";

interface ElementCodeProps extends Partial<JSX.IntrinsicElements["code"]> {
  isLink: boolean;
}

function ElementCode({ isLink, ...props }: ElementCodeProps) {
  return (
    <code
      className={cn(
        "inline break-words rounded-md bg-muted px-1 text-foreground no-underline",
        {
          "bg-highlight py-0 dark:bg-highlight-dark": isLink,
          "bg-opacity-60 py-[2px]": !isLink,
        }
      )}
      {...props}
    />
  );
}

export default ElementCode;
