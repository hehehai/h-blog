import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Details({
  children,
  className,
  ...props
}: ComponentProps<"details">) {
  // Native disclosure preserves keyboard and no-JS interaction; modern browsers
  // progressively enhance the height transition through ::details-content.
  return (
    <details className={cn("faq-details", className)} {...props}>
      {children}
    </details>
  );
}
