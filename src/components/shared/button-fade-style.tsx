'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { type HTMLAttributes, type ReactNode, useState } from 'react';

interface ButtonFadeStyleProps extends HTMLAttributes<HTMLAnchorElement> {
  label?: string;
  link?: string;
  children?: ReactNode;
}

export default function ButtonFadeStyle({
  label,
  link,
  className,
  children,
  ...props
}: ButtonFadeStyleProps) {
  const [mouseIn, setMouseIn] = useState(false);

  const TagName = link ? 'a' : 'span';
  const TagAttr = link
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {};

  return (
    <TagName
      href={link}
      {...TagAttr}
      className={cn(
        'relative inline-flex cursor-pointer overflow-hidden rounded-lg px-2 py-1 text-[0.8125rem] text-slate-900 leading-6 transition md:bg-transparent dark:text-white',
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
        initial={false}
        animate={mouseIn ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 h-full w-full bg-slate-700/[0.03] dark:bg-white/[0.06]"
      />
    </TagName>
  );
}
