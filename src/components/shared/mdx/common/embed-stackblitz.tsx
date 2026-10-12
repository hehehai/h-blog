"use client";

import type { EmbedOptions } from "@stackblitz/sdk";
import { useEffect, useRef, useState } from "react";

export interface EmbedStackblitzProps extends Partial<EmbedOptions> {
  id: string;
}

type EmbedStatus = "loading" | "ready" | "unsupported" | "error";

const statusMessages: Record<EmbedStatus, string> = {
  error: "在线示例加载失败，可以在 StackBlitz 中打开后重试。",
  loading: "正在准备在线示例…",
  ready: "",
  unsupported:
    "当前页面未启用跨源隔离，无法内嵌运行此项目。请在 StackBlitz 中打开示例。",
};

export default function EmbedStackblitz({
  id,
  ...options
}: EmbedStackblitzProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(options);
  const [status, setStatus] = useState<EmbedStatus>("loading");
  optionsRef.current = options;

  const projectUrl = new URL(
    `https://stackblitz.com/edit/${encodeURIComponent(id)}`
  );
  if (options.openFile) {
    projectUrl.searchParams.set(
      "file",
      Array.isArray(options.openFile)
        ? options.openFile.join(",")
        : options.openFile
    );
  }

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    if (!window.crossOriginIsolated) {
      setStatus("unsupported");
      return;
    }

    let disposed = false;
    setStatus("loading");
    const load = async (): Promise<void> => {
      try {
        const { default: sdk } = await import("@stackblitz/sdk");
        if (disposed) {
          return;
        }
        // The SDK replaces its target. Keep that target outside React's DOM
        // ownership so navigation/retries can safely dispose of the iframe.
        const target = document.createElement("div");
        host.replaceChildren(target);
        await sdk.embedProjectId(target, id, {
          height: 700,
          ...optionsRef.current,
        });
        if (!disposed) {
          setStatus("ready");
        }
      } catch {
        if (!disposed) {
          host.replaceChildren();
          setStatus("error");
        }
      }
    };
    load().catch(() => undefined);

    return () => {
      disposed = true;
      host.replaceChildren();
    };
  }, [id]);

  return (
    <div className="embed not-prose my-6 rounded-lg border p-4">
      {status !== "ready" && (
        <p className="mb-3 text-sm" role="status">
          {statusMessages[status]}
        </p>
      )}
      <a
        className="text-sm underline underline-offset-4"
        href={projectUrl.toString()}
        rel="noopener noreferrer"
        target="_blank"
      >
        在 StackBlitz 中打开示例
      </a>
      <div className="embed-stackblitz mt-3" ref={hostRef} />
    </div>
  );
}
