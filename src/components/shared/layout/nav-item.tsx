import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  text: string;
  active: boolean;
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
      href={href}
      className={cn('group relative px-5 pb-2 first:pl-0', className)}
      {...props}
    >
      <span>{text}</span>
      {active && (
        <motion.div
          layoutId="underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute bottom-0 h-1 rounded-full bg-zinc-700/10 dark:bg-white/20'
          )}
          style={{ width: `${text.length}em` }}
        />
      )}
    </Link>
  );
}
