import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { HTMLAttributes } from "react";
import { AnimatedLabel } from "@/components/shared/animated-label";
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
      aria-current={active ? "page" : undefined}
      className={cn("nav-link animated-link", active && "is-active", className)}
      to={href}
      {...props}
    >
      <AnimatedLabel text={text} />
      <ArrowUpRight aria-hidden="true" size={17} />
    </Link>
  );
}
