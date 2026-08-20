import { Image } from "@unpic/react";
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
              alt={photo.alt || `${title} 照片`}
              className="absolute inset-0 h-full w-full object-cover"
              height={800}
              layout="constrained"
              src={photo.path}
              width={1200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
