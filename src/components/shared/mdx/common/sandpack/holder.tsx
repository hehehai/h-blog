import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SandpackHolderProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
}

export function SandpackHolder({
  code,
  className,
  ...props
}: SandpackHolderProps) {
  return (
    <div className={cn("sandpack-holder", className)} {...props}>
      <pre>{code}</pre>
    </div>
  );
}
