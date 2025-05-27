import { Button } from "@/components/ui/button";

export default function Iframe({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative w-full">
      <header className="flex items-center justify-between mb-2">
        <div className="font-medium">{title}</div>
        <Button asChild variant="outline" className="h-7 text-sm">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            Open in new tab
          </a>
        </Button>
      </header>
      <div className="w-full h-[500px] border border-border rounded-lg overflow-hidden">
        <iframe src={src} className="w-full h-full" />
      </div>
    </div>
  );
}
