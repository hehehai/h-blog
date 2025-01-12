import { cn } from '@/lib/utils';
import type { JSX } from 'react';

interface ElementCodeProps extends Partial<JSX.IntrinsicElements['code']> {
  isLink: boolean;
}

function ElementCode({ isLink, ...props }: ElementCodeProps) {
  return (
    <code
      className={cn(
        'inline break-words rounded-md bg-gray-200 px-1 text-code text-foreground no-underline dark:bg-gray-800',
        {
          'bg-opacity-60 py-[2px]': !isLink,
          'bg-highlight py-0 dark:bg-highlight-dark': isLink,
        }
      )}
      {...props}
    />
  );
}

export default ElementCode;
