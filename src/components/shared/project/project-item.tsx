import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { IconGithub, IconWebsite } from "../icons";

interface ProjectLink {
  github?: string;
  site?: string;
}

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
  cover: string;
  description: string;
  links: ProjectLink;
  name: string;
  subtitle: string;
}

export default function Project({
  cover,
  name,
  subtitle,
  description,
  links,
  className,
  ...props
}: ProjectProps) {
  return (
    <div className={cn("max-w-3xl", className)} {...props}>
      <div className="mb-4 items-center md:flex md:space-x-2">
        <div className="text-xl">{name}</div>
        {subtitle && (
          <>
            <div className="hidden md:block"> —— </div>
            <div className="mt-2 md:mt-0">{subtitle}</div>
          </>
        )}
      </div>
      <div className="gap-5 md:flex">
        <div className="relative aspect-[5/3] w-full drop-shadow-lg md:w-[420px] md:shrink-0">
          <Image
            alt={name}
            className="rounded-xl object-cover"
            fill
            priority
            sizes="(min-width: 768px) 420px, 100vw"
            src={cover}
          />
        </div>
        <div className="mt-4 flex grow flex-col md:mt-0">
          <div className="mb-2 space-y-2.5 text-md md:text-sm">
            {description.split("\n").map((line: string, idx: number) => (
              <p key={idx + line}>{line}</p>
            ))}
          </div>
          <div className="mt-2 flex items-center space-x-4 md:mt-auto">
            {links.github && (
              <a
                className="flex cursor-pointer items-center rounded-lg bg-slate-900/[0.03] px-2 py-1 font-semibold text-slate-900 text-sm leading-6 transition hover:bg-slate-900/[0.06] dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.06]"
                href={links.github}
                rel="noreferrer"
                target="_blank"
              >
                <IconGithub className="text-xl" />
                <span className="ml-2">Github</span>
              </a>
            )}
            {links.site && (
              <a
                className="flex cursor-pointer items-center rounded-lg bg-slate-900/[0.03] px-2 py-1 font-semibold text-slate-900 text-sm leading-6 transition hover:bg-slate-900/[0.06] dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.06]"
                href={links.site}
                rel="noreferrer"
                target="_blank"
              >
                <IconWebsite className="text-xl" />
                <span className="ml-2">Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
