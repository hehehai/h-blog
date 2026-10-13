import { cva } from "class-variance-authority";
import { Info, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import type { HTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

const CALLOUT_ICONS = {
  exploding: TriangleAlert,
  find: Info,
  sick: TriangleAlert,
  thinking: Lightbulb,
};
type CalloutType = keyof typeof CALLOUT_ICONS;
const calloutVariants = cva("callout", {
  defaultVariants: { type: "thinking" },
  variants: {
    type: {
      exploding: "callout-warning",
      find: "callout-info",
      sick: "callout-warning",
      thinking: "callout-info",
    },
  },
});
interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  emoji?: string;
  type?: CalloutType;
}

export function Callout({
  children,
  type = "thinking",
  emoji,
  className,
  ...props
}: CalloutProps): ReactElement {
  const Icon = emoji ? Sparkles : CALLOUT_ICONS[type];
  return (
    <aside className={cn(calloutVariants({ type }), className)} {...props}>
      <Icon aria-hidden="true" className="callout-icon" size={18} />
      <div className="callout-content">{children}</div>
    </aside>
  );
}
