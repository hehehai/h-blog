import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

export default function HeaderButton(props: {
  label?: string;
  link?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
}) {
  const { label, link, children, onClick } = props;
  const [mouseIn, setMouseIn] = useState(false);

  const TagName = link ? "a" : "span";
  const TagAttr = link
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return (
    <TagName
      href={link}
      {...TagAttr}
      className="inline-flex rounded-lg text-slate-900 dark:text-white font-semibold transition text-[0.8125rem] leading-6 py-1 px-2 md:bg-transparent cursor-pointer relative overflow-hidden"
      onClick={(e: any) => onClick?.(e)}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
    >
      <span className="relative z-[1] inline-flex items-center">
        {children}
        {label && <span className="ml-2">{label}</span>}
      </span>
      <motion.div
        animate={mouseIn ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-slate-700/[0.03] w-full h-full dark:bg-white/[0.06]"
      ></motion.div>
    </TagName>
  );
}
