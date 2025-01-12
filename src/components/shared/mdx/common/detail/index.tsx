import type { ReactNode } from 'react';
import { Details } from './detail';
import { Summary } from './summary';

export function FAQBox({
  title,
  open = true,
  children,
}: {
  title: string;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <Details open={open}>
      <Summary>{title}</Summary>
      {children}
    </Details>
  );
}
