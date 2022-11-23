import Link from "next/link";
import JumpLink from "../icons/JumpLink";

export default function CustomLink(props: any) {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className="underline-offset-4" {...props}>{props.children}</a>
      </Link>
    );
  }

  return (
    <a className="underline-offset-4" target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
      <span className="ml-1">
        <JumpLink size={'1em'} />
      </span>
    </a>
  );
}
