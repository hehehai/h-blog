import { Image } from "@unpic/react";
import { ArrowUpRight } from "lucide-react";
import type { HTMLAttributes } from "react";
import { getProjectAnchor } from "@/lib/project-anchor";
import { cn } from "@/lib/utils";

const LIST_PREFIX = /^-\s*/;

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
  cover: string;
  description: string;
  links: { github?: string; site?: string };
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
    <article
      className={cn("project-card", className)}
      id={getProjectAnchor(name)}
      {...props}
    >
      <a
        aria-label={`查看 ${name} 项目`}
        className="project-media"
        href={links.site ?? links.github}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt={`${name} 项目界面`}
          className="project-image"
          height={480}
          layout="constrained"
          src={cover}
          width={800}
        />
      </a>
      <div className="project-info">
        <div className="project-title">
          <h3>{name}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="project-description">
          {description.split("\n").map((line) => (
            <p key={line}>{line.replace(LIST_PREFIX, "")}</p>
          ))}
        </div>
        <div className="project-links">
          {links.site && (
            <a
              className="text-link"
              href={links.site}
              rel="noopener noreferrer"
              target="_blank"
            >
              访问网站 <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          )}
          {links.github && (
            <a
              className="text-link"
              href={links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
