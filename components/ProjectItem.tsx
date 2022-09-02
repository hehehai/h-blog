import Image from "next/image";
import Github from "./icons/Github";
import Website from "./icons/Website";

export default function Project(props: any) {
  const { cover, name, subtitle, description, links } = props;

  return (
    <div className="max-w-xl">
      <div className="mb-2 flex items-center space-x-2">
        <span className="text-xl">{name}</span>
        {subtitle && (
          <>
            <span> —— </span>
            <span>{subtitle}</span>
          </>
        )}
      </div>
      <div className="flex gap-3">
        <div className="bg-gray-50">
          {cover && <Image src={cover} width={140} height={110} />}
        </div>
        <div className="grow flex flex-col">
          <div className="mb-2">{description}</div>
          <div className="flex items-center space-x-2 mt-auto">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                className="rounded-lg text-slate-900 font-semibold transition flex items-center text-[0.6125rem] leading-6 py-1 px-2 bg-slate-900/[0.03] cursor-pointer" rel="noreferrer"
              >
                <Github size={18} />
                <span className="ml-2">Github</span>
              </a>
            )}
            {links.site && (
              <a
                href={links.site}
                target="_blank"
                className="rounded-lg text-slate-900 font-semibold transition flex items-center text-[0.6125rem] leading-6 py-1 px-2 bg-slate-900/[0.03] cursor-pointer" rel="noreferrer"
              >
                <Website size={18} />
                <span className="ml-2">Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
