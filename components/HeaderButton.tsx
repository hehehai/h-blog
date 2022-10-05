import { ReactNode } from "react";

export default function HeaderButton(props: {
  label?: string;
  link?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
}) {
  const { label, link, children, onClick } = props;

  const TagName = link ? "a" : "span";
  const TagAttr = link
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return (
    <TagName
      href={link}
      {...TagAttr}
      className="rounded-lg text-slate-900 dark:text-white dark:bg-white/[0.03] font-semibold transition flex items-center text-[0.8125rem] leading-6 py-1 px-2 hover:bg-slate-900/[0.03] cursor-pointer"
      onClick={(e: any) => onClick?.(e)}
    >
      {children}
      {label && <span className="ml-3">{label}</span>}
    </TagName>
  );
}
