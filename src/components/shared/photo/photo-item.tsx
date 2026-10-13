import { Image } from "@unpic/react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Atlas } from "@/types/photo";

export default function PhotoItem({ title, photos, time }: Atlas) {
  const [selected, setSelected] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const photo = selected === null ? undefined : photos[selected];
  const move = (direction: number): void => {
    if (photos.length > 0) {
      setSelected(
        (current) =>
          ((current ?? 0) + direction + photos.length) % photos.length
      );
    }
  };

  return (
    <section className="photo-album">
      <div className="section-heading">
        <h2>{title}</h2>
        <span className="eyebrow">{time}</span>
      </div>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
        open={selected !== null}
      >
        <div className="photo-grid">
          {photos.map((item, index) => (
            <figure className="photo-frame" key={item.path}>
              <button
                aria-label={`放大 ${item.alt || `${title} · 照片 ${index + 1}`}`}
                className="photo-button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelected(index);
                }}
                type="button"
              >
                <Image
                  alt={item.alt || `${title} · 照片 ${index + 1}`}
                  className="photo-image"
                  height={800}
                  layout="constrained"
                  src={item.path}
                  width={1200}
                />
                <span aria-hidden="true" className="photo-expand">
                  <Expand size={17} />
                </span>
              </button>
              {item.alt && <figcaption>{item.alt}</figcaption>}
            </figure>
          ))}
        </div>
        <DialogContent
          className="photo-lightbox"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <DialogTitle className="pr-8 font-medium">{title}</DialogTitle>
          <DialogDescription>
            {photo?.alt || "生活与旅途的记录"} · {time}
          </DialogDescription>
          {photo && (
            <Image
              alt={photo.alt || title}
              className="lightbox-image"
              height={1000}
              layout="constrained"
              src={photo.path}
              width={1500}
            />
          )}
          <div className="lightbox-controls">
            <button
              aria-label="上一张照片"
              className="icon-button"
              onClick={() => move(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
            <span aria-live="polite" className="eyebrow">
              {(selected ?? 0) + 1} / {photos.length}
            </span>
            <button
              aria-label="下一张照片"
              className="icon-button"
              onClick={() => move(1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
