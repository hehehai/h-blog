import Link from "next/link";
import JumpLink from "./icons/JumpLink";

export default function CustomLink(props: any) {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className="underline-offset-4" {...props}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <a
      className="underline-offset-4 inline-flex items-center space-x-1"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span>{props.children}</span>
      <JumpLink size={"1em"} />
    </a>
  );
}
