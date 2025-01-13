"use client";

import { TerminalIcon } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className="flex h-[80vh] w-full flex-col items-center justify-center">
			<Alert className="my-6 w-[40%]">
				<TerminalIcon className="h-4 w-4" />
				<AlertTitle>{error.name}</AlertTitle>
				<AlertDescription>{error.message}</AlertDescription>
			</Alert>

			<div className="mt-5 flex items-center">
				<Button variant="outline" asChild>
					<Link
						href={`https://github.com/hehehai/h-blog/issues/new?labels=runtime+error&title=${`Runtime: ${error.name}`}&body=${error.message}`}
						target="_blank"
					>
						提交问题
					</Link>
				</Button>
				<Button onClick={() => reset()} className="ml-3">
					重试
				</Button>
			</div>
		</div>
	);
}
