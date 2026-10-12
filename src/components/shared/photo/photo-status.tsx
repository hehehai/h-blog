import { useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PhotoFailure, PhotoLoadResult } from "@/types/photo";

const failureMessages: Record<PhotoFailure, string> = {
  "invalid-data": "照片服务返回了无法识别的数据，请稍后重试。",
  "rate-limit": "照片服务请求次数已达上限，请等待后重试。",
  timeout: "连接照片服务超时，请稍后重试。",
  upstream: "暂时无法连接照片服务，请稍后重试。",
};

export function PhotoStatus({ result }: { result: PhotoLoadResult }) {
  const router = useRouter();
  const isLoading = useRouterState({
    select: (state) =>
      state.isLoading || state.matches.some((match) => match.isFetching),
  });
  // Start with the serialized server value to avoid clock-based hydration drift.
  const [secondsLeft, setSecondsLeft] = useState(result.retryAfterSeconds);

  useEffect(() => {
    const update = () => {
      setSecondsLeft(
        Math.max(0, Math.ceil((result.retryAt - Date.now()) / 1000))
      );
    };
    update();
    if (!result.retryAt) {
      return;
    }
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [result.retryAt]);

  if (result.status === "ready") {
    return null;
  }

  return (
    <section aria-label="照片加载状态" className="rounded-lg border p-4">
      <div role="status">
        <h1 className="font-semibold text-lg">
          {result.status === "stale" ? "暂时无法更新照片" : "照片暂时无法加载"}
        </h1>
        <p className="mt-2 text-sm">
          {failureMessages[result.reason ?? "upstream"]}
          {result.status === "stale" && " 正在显示最近一次成功加载的照片。"}
        </p>
      </div>
      <Button
        aria-busy={isLoading}
        className="mt-4"
        disabled={isLoading || secondsLeft > 0}
        onClick={() => router.invalidate()}
        type="button"
        variant="outline"
      >
        {isLoading
          ? "正在重试…"
          : secondsLeft > 0
            ? `${secondsLeft} 秒后可重试`
            : "重试加载照片"}
      </Button>
    </section>
  );
}
