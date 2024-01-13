import Github from "./icons/Github";
import Website from "./icons/Website";
import Image from "next/image";

interface ProjectLink {
  github?: string;
  site?: string;
}

interface ProjectProps {
  cover: string;
  name: string;
  subtitle: string;
  description: string;
  links: ProjectLink;
}

export default function Project(props: ProjectProps) {
  const { cover, name, subtitle, description, links } = props;

  return (
    <div className="max-w-3xl">
      <div className="mb-4 md:flex items-center md:space-x-2">
        <div className="text-xl">{name}</div>
        {subtitle && (
          <>
            <div className="hidden md:block"> —— </div>
            <div className="mt-2 md:mt-0">{subtitle}</div>
          </>
        )}
      </div>
      <div className="md:flex gap-5">
        <div className="w-full aspect-[5/3] md:w-[220px] md:shrink-0 drop-shadow-lg relative">
          <Image
            src={cover}
            alt={name}
            className="object-cover rounded-xl"
            priority
            layout="fill"
          />
        </div>
        <div className="mt-4 md:mt-0 grow flex flex-col">
          <div className="text-md md:text-sm space-y-1 mb-2">
            {description.split("\n").map((line: string, idx: number) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-2 md:mt-auto">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                className="rounded-lg text-slate-900 dark:text-white dark:bg-white/[0.03] dark:hover:bg-white/[0.06] font-semibold transition flex items-center text-sm leading-6 py-1 px-2 bg-slate-900/[0.03] hover:bg-slate-900/[0.06] cursor-pointer"
                rel="noreferrer"
              >
                <Github className="text-xl" />
                <span className="ml-2">Github</span>
              </a>
            )}
            {links.site && (
              <a
                href={links.site}
                target="_blank"
                className="rounded-lg text-slate-900 dark:text-white dark:bg-white/[0.03] dark:hover:bg-white/[0.06] font-semibold transition flex items-center text-sm leading-6 py-1 px-2 bg-slate-900/[0.03] hover:bg-slate-900/[0.06] cursor-pointer"
                rel="noreferrer"
              >
                <Website className="text-xl" />
                <span className="ml-2">Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
