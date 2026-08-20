import { cva } from "class-variance-authority";
import Image from "next/image";
import type { HTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

const TypeToEmoji = {
  exploding: "/static/images/emojis/exploding.png",
  find: "/static/images/emojis/find.png",
  sick: "/static/images/emojis/sick.png",
  thinking: "/static/images/emojis/thinking.png",
};

type CalloutType = keyof typeof TypeToEmoji;

const calloutVariants = cva(
  [
    "flex overflow-x-auto rounded-xl border py-5 pr-5 pl-4",
    "space-x-2 contrast-more:border-current contrast-more:dark:border-current",
  ],
  {
    defaultVariants: {
      type: "thinking",
    },
    variants: {
      type: {
        exploding:
          "border-yellow-100 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-700/30 dark:text-yellow-200",
        find: "border-indigo-200 bg-indigo-100 text-indigo-900 dark:border-indigo-200/30 dark:bg-indigo-900/30 dark:text-indigo-200",
        sick: "border-red-200 bg-red-100 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-200",
        thinking:
          "border-orange-100 bg-orange-50 text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/20 dark:text-orange-300",
      },
    },
  }
);

interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  emoji?: string;
  type?: CalloutType;
}

export function Callout({
  children,
  type = "thinking",
  className,
  ...props
}: CalloutProps): ReactElement {
  return (
    <div className={cn(calloutVariants({ type }), className)} {...props}>
      <div className="relative mr-1 h-[1.6em] w-[1.7em] select-none">
        <Image
          alt={type}
          className="h-full w-full object-contain"
          fill
          sizes="1.7em"
          src={TypeToEmoji[type]}
        />
      </div>
      <div className="children-last-plan w-full min-w-0 leading-7">
        {children}
      </div>
    </div>
  );
}
