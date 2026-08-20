import { Button } from "@/components/ui/button";

export default function Iframe({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative w-full">
      <header className="mb-2 flex items-center justify-between">
        <div className="font-medium">{title}</div>
        <Button asChild className="h-7 text-sm" variant="outline">
          <a
            className="no-underline"
            href={src}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open in new tab
          </a>
        </Button>
      </header>
      <div className="h-[500px] w-full overflow-hidden rounded-lg border border-border">
        <iframe className="h-full w-full" src={src} title={title} />
      </div>
    </div>
  );
}
