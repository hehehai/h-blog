'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import { Collapse } from '../collapse';
import { DetailsProvider } from './context';
import { findSummary } from './helper';

export const Details = ({
  children,
  open,
  ...props
}: ComponentProps<'details'>) => {
  const [openState, setOpen] = useState(!!open);
  const [summary, restChildren] = findSummary(children);

  // To animate the close animation we have to delay the DOM node state here.
  const [delayedOpenState, setDelayedOpenState] = useState(openState);
  useEffect(() => {
    if (openState) {
      setDelayedOpenState(true);
    } else {
      const timeout = setTimeout(() => setDelayedOpenState(openState), 500);
      return () => clearTimeout(timeout);
    }
  }, [openState]);

  return (
    <details
      className="my-4 rounded-xl border border-gray-200/60 bg-neutral-100 p-3 first:mt-0 dark:border-gray-800 dark:bg-gray-900"
      {...props}
      open={delayedOpenState}
      {...(openState && { 'data-expanded': true })}
    >
      <DetailsProvider value={setOpen}>{summary}</DetailsProvider>
      <Collapse isOpen={openState}>{restChildren}</Collapse>
    </details>
  );
};
