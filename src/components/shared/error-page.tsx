"use client";

import type { ErrorComponentProps } from "@tanstack/react-router";
import { TerminalIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: ErrorComponentProps) {
  const issueUrl = new URL(
    "https://github.com/hehehai/h-blog/issues/new?labels=runtime+error"
  );
  issueUrl.searchParams.set("title", `Runtime: ${error.name}`);
  issueUrl.searchParams.set("body", error.message);

  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center px-5">
      <Alert className="my-6 w-full max-w-xl">
        <TerminalIcon className="h-4 w-4" />
        <AlertTitle>{error.name}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>

      <div className="mt-5 flex items-center">
        <Button asChild variant="outline">
          <a
            href={issueUrl.toString()}
            rel="noopener noreferrer"
            target="_blank"
          >
            提交问题
          </a>
        </Button>
        <Button className="ml-3" onClick={reset} type="button">
          重试
        </Button>
      </div>
    </main>
  );
}
