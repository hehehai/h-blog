import { Link } from "@tanstack/react-router";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { IconJumpLink } from "../../icons";

interface ElementLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function ElementLink({
  href,
  className,
  ...props
}: ElementLinkProps) {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        className={cn("underline-offset-4", className)}
        to={href}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <a
      className={cn(
        "group wrap-break-word inline cursor-pointer items-center space-x-1 underline-offset-4",
        className
      )}
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      {...props}
    >
      <span>{props.children}</span>
      <IconJumpLink className="inline transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none" />
    </a>
  );
}
