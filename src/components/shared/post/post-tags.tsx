import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface PostTagsProps extends HTMLAttributes<HTMLDivElement> {
  tags?: string[];
  title?: string;
  isSimple?: boolean;
}

export default function PostTags({
  tags,
  title,
  isSimple = false,
  className,
  ...props
}: PostTagsProps) {
  if (!tags) {
    return null;
  }

  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    >
      {title && <div>{title}</div>}
      {tags.map((tag) => (
        <Badge
          variant="outline"
          key={tag}
          className={cn(
            'rounded-md font-normal',
            isSimple && 'border-none px-1 text-sm underline'
          )}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
