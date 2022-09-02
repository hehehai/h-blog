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
      <a
        className={cn([
          "border-b-4",
          isActive ? "border-cyan-400" : "border-transparent",
        ])}
      >
        <span className="">{text}</span>
      </a>
    </NextLink>
  );
}
