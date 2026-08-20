import type { HTMLAttributes } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PostTagsProps extends HTMLAttributes<HTMLDivElement> {
  isSimple?: boolean;
  tags?: string[];
  title?: string;
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
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {title && <div>{title}</div>}
      {tags.map((tag) => (
        <Badge
          className={cn(
            "rounded-md font-normal",
            isSimple && "border-none px-1 text-sm underline"
          )}
          key={tag}
          variant="outline"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
