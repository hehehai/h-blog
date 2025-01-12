import PhotoItem from '@/components/shared/photo/photo-item';
import { getAtlas } from '@/functions/photo';
import type { Atlas } from '@/types/photo';

export default async function Photos() {
  const atlas = await getAtlas();

  return (
    <div className="space-y-10">
      {atlas.map((item: Atlas) => (
        <PhotoItem key={item.title} {...item} />
      ))}
    </div>
  );
}
