import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";
import { motion } from "framer-motion";

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  text: string;
  active: boolean;
}

export default function NavItem({
  href,
  text,
  active,
  ...props
}: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;
  const underLen = text.length;

  return (
    <NextLink href={href}>
      <a className={cn(["relative group px-5 first:pl-0 pb-2"])} {...props}>
        <span>{text}</span>
        {(active || isActive) && (
          <motion.div
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute bottom-0 h-1 rounded-full bg-zinc-700/10 dark:bg-white/20"
            )}
            style={{ width: `${underLen}em` }}
          />
        )}
      </a>
    </NextLink>
  );
}
