import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";

interface NavItemProps {
  href: string;
  text: string;
}

export default function NavItem({ href, text }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a className={cn(["relative group"])}>
        <span>{text}</span>
        <span
          className={cn(
            isActive ? "opacity-100" : "opacity-0",
            "group-hover:opacity-100",
            "absolute -bottom-2 inset-x-0 h-1 rounded-full bg-zinc-700/10 dark:bg-white/20"
          )}
        />
      </a>
    </NextLink>
  );
}
