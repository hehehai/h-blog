import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import { IconJumpLink } from '../../icons';

interface ElementLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function ElementLink({
  href,
  className,
  ...props
}: ElementLinkProps) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className={cn('underline-offset-4', className)}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <a
      className={cn(
        'group inline cursor-pointer items-center space-x-1 break-all underline-offset-4',
        className
      )}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
    >
      <span>{props.children}</span>
      <IconJumpLink className="inline group-hover:animate-shaking" />
    </a>
  );
}
