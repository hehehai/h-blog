import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { AnimatedLabel } from "./animated-label";
import GithubIcon from "./icons/icon-github";
import ThreadsIcon from "./icons/icon-threads";
import TwitterIcon from "./icons/icon-twitter";

const SOCIAL_LINKS = [
  { href: siteConfig.github, Icon: GithubIcon, name: "GitHub" },
  { href: siteConfig.twitter, Icon: TwitterIcon, name: "X" },
  { href: siteConfig.threads, Icon: ThreadsIcon, name: "Threads" },
];

export function SocialLinks({
  className,
  iconsOnly = false,
}: {
  className?: string;
  iconsOnly?: boolean;
}) {
  return (
    <div
      className={cn(
        "social-links",
        iconsOnly ? "social-links-icons" : "social-links-text",
        className
      )}
    >
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          aria-label={`${name}（新窗口）`}
          className={iconsOnly ? "social-icon-link" : "animated-link"}
          href={href}
          key={name}
          rel="noopener noreferrer"
          target="_blank"
          title={name}
        >
          {iconsOnly ? (
            <Icon
              aria-hidden="true"
              className={cn(
                "social-icon",
                name === "Threads" && "social-icon-threads"
              )}
              focusable="false"
            />
          ) : (
            <>
              <AnimatedLabel text={name} />
              <ArrowUpRight aria-hidden="true" size={13} />
            </>
          )}
        </a>
      ))}
    </div>
  );
}
