import type { AtlasMeta, Photo } from "@/types/photo";

const metadataKeys: Record<keyof AtlasMeta, string> = {
  description: "Description: ",
  place: "Place: ",
  time: "Time: ",
};
const linePattern = /\r?\n/;
const imagePattern = /!\[(?<alt>[^\]]*)\]\((?<path>.*?)(?="|\))/g;
const imageUrlPattern = /^https?:\/\//i;

export function atlasParser(body: string): {
  meta: AtlasMeta;
  photos: Photo[];
} {
  const meta: AtlasMeta = {};
  const photos: Photo[] = [];

  for (const line of body.split(linePattern)) {
    if (line.startsWith(metadataKeys.description)) {
      meta.description = line.substring(metadataKeys.description.length);
    } else if (line.startsWith(metadataKeys.place)) {
      meta.place = line.substring(metadataKeys.place.length);
    } else if (line.startsWith(metadataKeys.time)) {
      meta.time = line.substring(metadataKeys.time.length);
    } else {
      for (const match of line.matchAll(imagePattern)) {
        const path = match.groups?.path.trim();
        if (path && imageUrlPattern.test(path)) {
          photos.push({ alt: match.groups?.alt, path });
        }
      }
    }
  }

  return { meta, photos };
}
