'use client';

import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { useDetails } from './context';

export const Summary = (props: ComponentProps<'summary'>) => {
  const setOpen = useDetails();
  return (
    <summary
      className={cn(
        'flex cursor-pointer list-none items-center rounded-lg p-1.5 text-foreground transition-colors hover:bg-white/80 dark:hover:bg-gray-700',
        'text-lg before:mr-1 before:inline-block before:shrink-0 before:transition-transform before:content-[""] dark:before:invert',
        '[[data-expanded]>&]:before:rotate-90'
      )}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        setOpen((v) => !v);
      }}
    />
  );
};
