import { Check, Copy, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "busy" | "copied" | "error";
interface CopyButtonProps {
  className?: string;
  label: string;
  value: string | (() => string);
}

export function CopyButton({ className, label, value }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const [mounted, setMounted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const active = useRef(false);
  useEffect(() => {
    active.current = true;
    setMounted(true);
    return () => {
      active.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  const copy = async (): Promise<void> => {
    clearTimeout(timer.current);
    setState("busy");
    try {
      await navigator.clipboard.writeText(
        typeof value === "function" ? value() : value
      );
      if (active.current) {
        setState("copied");
      }
    } catch {
      if (active.current) {
        setState("error");
      }
    }
    if (active.current) {
      timer.current = setTimeout(() => setState("idle"), 3000);
    }
  };
  const text =
    state === "copied"
      ? "已复制"
      : state === "error"
        ? "复制失败，请手动选择"
        : state === "busy"
          ? "正在复制…"
          : "复制";
  return (
    <span className={cn("copy-control", className)}>
      <button
        aria-busy={state === "busy"}
        aria-label={label}
        className="copy-button"
        disabled={!mounted || state === "busy"}
        onClick={copy}
        type="button"
      >
        {state === "copied" ? (
          <Check aria-hidden="true" size={14} />
        ) : state === "busy" ? (
          <LoaderCircle aria-hidden="true" className="copy-spinner" size={14} />
        ) : (
          <Copy aria-hidden="true" size={14} />
        )}
        <span>{text}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied"
          ? `${label}成功`
          : state === "error"
            ? `${label}失败，请手动选择文本`
            : ""}
      </span>
    </span>
  );
}
