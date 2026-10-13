import type { ReactNode } from "react";

interface PageHeadingProps {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}

export function PageHeading({
  children,
  description,
  eyebrow,
  title,
}: PageHeadingProps) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-description">{description}</p>
      {children}
    </header>
  );
}
