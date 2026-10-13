import { Image } from "@unpic/react";
import { authorProfile } from "@/lib/config/author";
import { cn } from "@/lib/utils";

interface AuthorAvatarProps {
  className?: string;
  size?: number;
}

export function AuthorAvatar({ className, size = 32 }: AuthorAvatarProps) {
  return (
    <Image
      alt="一块木头的头像：小白狗在海浪上冲浪"
      className={cn("author-avatar", className)}
      height={size}
      layout="fixed"
      src={authorProfile.avatar}
      width={size}
    />
  );
}
