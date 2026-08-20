"use client";

import { motion } from "motion/react";
import { type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ButtonFadeStyleProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  label?: string;
  link?: string;
}

export default function ButtonFadeStyle({
  label,
  link,
  className,
  children,
  ...props
}: ButtonFadeStyleProps) {
  const [mouseIn, setMouseIn] = useState(false);

  const TagName = link ? "a" : "button";
  const TagAttr = link
    ? {
        href: link,
        rel: "noreferrer",
        target: "_blank",
      }
    : { type: "button" as const };

  return (
    <TagName
      {...TagAttr}
      className={cn(
        "relative inline-flex cursor-pointer overflow-hidden rounded-lg border-0 bg-transparent px-2 py-1 text-[0.8125rem] text-slate-900 leading-6 transition md:bg-transparent dark:text-white",
        className
      )}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      {...props}
    >
      <span className="relative z-[1] inline-flex items-center">
        {children}
        {label && <span className="mr-[2px] ml-2">{label}</span>}
      </span>
      <motion.div
        animate={mouseIn ? { scale: 1 } : { scale: 0 }}
        className="absolute inset-0 h-full w-full bg-slate-700/[0.03] dark:bg-white/[0.06]"
        initial={false}
        transition={{ duration: 0.2 }}
      />
    </TagName>
  );
}
