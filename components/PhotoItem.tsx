import Image from "next/image";
import { Atlas } from "../pages/interface/photo";

export default function PhotoItem(props: Atlas) {
  const { title, photos, time } = props;

  return (
    <div>
      <div className="text-xl mb-4">
        <span>{title}</span>
        <span className="text-sm ml-2">{time}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div className="w-full h-72 relative" key={photo.path}>
            <Image
              src={photo.path}
              alt={photo.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
