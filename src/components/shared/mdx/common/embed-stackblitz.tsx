'use client';

import sdk, { type VM } from '@stackblitz/sdk';
import type { EmbedOptions } from '@stackblitz/sdk';
import { useCallback, useEffect, useRef } from 'react';

export interface EmbedStackblitzProps extends Partial<EmbedOptions> {
  id: string;
}

export default function EmbedStackblitz({
  id,
  ...options
}: EmbedStackblitzProps) {
  const embedRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<VM | null>(null);

  const create = useCallback(
    async (options: Partial<EmbedOptions>) => {
      if (!embedRef.current || instanceRef.current) {
        return;
      }

      try {
        // Replaces the HTML element with the id of "embed"
        // with https://stackblitz.com/edit/my-cool-project embedded in an iframe,
        instanceRef.current = await sdk.embedProjectId(embedRef.current, id, {
          height: 700,
          ...options,
        });
      } catch (e) {
        console.info(`embed error: ${id}`, e);
      }
    },
    [id]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    create(options);
  }, []);

  return (
    <div className="embed">
      <div className="embed-stackblitz" ref={embedRef} />
    </div>
  );
}
