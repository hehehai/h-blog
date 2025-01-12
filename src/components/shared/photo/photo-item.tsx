import type { Atlas } from '@/types/photo';
import Image from 'next/image';

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
              src={photo.path}
              alt={photo.alt ?? ''}
              lazyBoundary="200px"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
