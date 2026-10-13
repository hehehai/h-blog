import { type HTMLAttributes, isValidElement, useRef } from "react";
import { CopyButton } from "@/components/shared/copy-button";
import { cn } from "@/lib/utils";

const LANGUAGE_PATTERN = /language-([^\s]+)/;
const LANGUAGE_LABELS: Record<string, string> = {
  bash: "终端",
  css: "CSS",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  sh: "终端",
  shell: "终端",
  sql: "SQL",
  text: "文本",
  ts: "TypeScript",
  tsx: "TSX",
  txt: "文本",
  typescript: "TypeScript",
};

interface ElementPreCodeProps extends HTMLAttributes<HTMLPreElement> {
  isLink?: boolean;
}

export default function ElementPreCode({
  isLink: _isLink,
  className,
  children,
  ...props
}: ElementPreCodeProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const childClass = isValidElement<{ className?: string }>(children)
    ? children.props.className
    : undefined;
  const language = childClass?.match(LANGUAGE_PATTERN)?.[1] ?? "text";
  return (
    <div className="code-block not-prose">
      <div className="code-toolbar">
        <span>{LANGUAGE_LABELS[language] ?? language}</span>
        <CopyButton
          label="复制代码"
          value={() => preRef.current?.textContent ?? ""}
        />
      </div>
      <pre className={cn("code-pre", className)} ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
