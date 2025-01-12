import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface ElementPreCodeProps extends HTMLAttributes<HTMLPreElement> {
  isLink: boolean;
}

export default function ElementPreCode({
  isLink,
  className,
  ...props
}: ElementPreCodeProps) {
  return (
    <div className="relative">
      <pre
        className={cn(
          'block break-words rounded-xl px-1 text-secondary no-underline dark:bg-slate-900 dark:text-secondary-foreground',
          {
            'bg-opacity-60 py-px': !isLink,
            'bg-highlight py-0 dark:bg-highlight-dark': isLink,
          },
          className
        )}
        {...props}
      />
    </div>
  );
}
