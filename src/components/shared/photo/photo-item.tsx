import Image from "next/image";
import type { Atlas } from "@/types/photo";

export default function PhotoItem(props: Atlas) {
  const { title, photos, time } = props;

  return (
    <div>
      <div className="mb-4 text-xl">
        <span>{title}</span>
        <span className="ml-2 text-sm">{time}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <div className="relative h-72 w-full" key={photo.path}>
            <Image
              alt={photo.alt ?? ""}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              src={photo.path}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
