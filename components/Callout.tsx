import cn from "clsx";
import type { ReactElement, ReactNode } from "react";
import Image from "next/image";

const TypeToEmoji = {
  thinking: "/static/images/emojis/thinking.png",
  exploding: "/static/images/emojis/exploding.png",
  sick: "/static/images/emojis/sick.png",
  find: "/static/images/emojis/find.png",
};

type CalloutType = keyof typeof TypeToEmoji;

const classes: Record<CalloutType, string> = {
  thinking: cn(
    "border-orange-100 bg-orange-50 text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/20 dark:text-orange-300"
  ),
  sick: cn(
    "border-red-200 bg-red-100 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-200"
  ),
  find: cn(
    "border-indigo-200 bg-indigo-100 text-indigo-900 dark:border-indigo-200/30 dark:bg-indigo-900/30 dark:text-indigo-200"
  ),
  exploding: cn(
    "border-yellow-100 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-700/30 dark:text-yellow-200"
  ),
};

type CalloutProps = {
  type?: CalloutType;
  emoji?: string;
  children: ReactNode;
};

export function Callout({
  children,
  type = "thinking",
}: CalloutProps): ReactElement {
  return (
    <div
      className={cn(
        "overflow-x-auto flex rounded-xl border pl-4 pr-5 py-5",
        "contrast-more:border-current contrast-more:dark:border-current space-x-2",
        classes[type]
      )}
    >
      <div className="select-none mr-1 w-[1.7em] h-[1.6em] relative">
        <Image
          src={TypeToEmoji[type]}
          width={80}
          height={80}
          alt={type}
          className="w-full h-full"
          layout="fill"
        ></Image>
      </div>
      <div className="w-full min-w-0 leading-7 children-last-plan">
        {children}
      </div>
    </div>
  );
}
