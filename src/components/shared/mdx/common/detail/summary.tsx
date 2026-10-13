import { ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Summary({
  children,
  className,
  ...props
}: ComponentProps<"summary">) {
  return (
    <summary className={cn("faq-summary", className)} {...props}>
      <ChevronRight aria-hidden="true" size={17} />
      <span>{children}</span>
    </summary>
  );
}
