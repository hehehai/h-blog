import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  active: boolean;
  href: string;
  text: string;
}

export default function NavItem({
  href,
  text,
  active,
  className,
  ...props
}: NavItemProps) {
  return (
    <Link
      className={cn("group relative px-5 pb-2 first:pl-0", className)}
      to={href}
      {...props}
    >
      <span>{text}</span>
      {active && (
        <motion.div
          animate={{ opacity: 1 }}
          className={cn(
            "absolute bottom-0 h-1 rounded-full bg-zinc-700/10 dark:bg-white/20"
          )}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          layoutId="underline"
          style={{ width: `${text.length}em` }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}
