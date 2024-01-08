import sdk, { VM } from "@stackblitz/sdk";
import type { EmbedOptions } from "@stackblitz/sdk";
import { useCallback, useEffect, useRef } from "react";

export interface EmbedStackblitzProps {
  id: string;
}

export default function EmbedStackblitz(
  props: EmbedStackblitzProps & Partial<EmbedOptions>
) {
  const { id, ...options } = props;
  const embedRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<VM | null>(null);

  const create = useCallback(async () => {
    if (!embedRef.current || instanceRef.current) return;
    try {
      // Replaces the HTML element with the id of "embed"
      // with https://stackblitz.com/edit/my-cool-project embedded in an iframe,
      instanceRef.current = await sdk.embedProjectId(embedRef.current, id, {
        height: 700,
        ...options,
      });
    } catch (e) {
      console.log(`embed error: ${id}`, e);
    }
  }, [id, options, embedRef]);

  useEffect(() => {
    create();
  }, [create]);

  return (
    <div className="embed">
      <div className="embed-stackblitz" ref={embedRef} />
    </div>
  );
}
