import type { AtlasMeta, Issue, Photo } from '@/types/photo';

const MetaKeyMap: Record<keyof AtlasMeta, string> = {
  description: 'Description: ',
  place: 'Place: ',
  time: 'Time: ',
};

const MarkDownImageRgx = /!\[(?<alt>[^\]]*)\]\((?<path>.*?)(?="|\))\)/g;

export const atlasParser = (body: string) => {
  const lines = body.split('\r\n');
  const meta: AtlasMeta = {};
  const photos: Photo[] = [];

  for (const line of lines) {
    if (line.startsWith(MetaKeyMap.description)) {
      meta.description = line.substring(MetaKeyMap.description.length);
    } else if (line.startsWith(MetaKeyMap.place)) {
      meta.place = line.substring(MetaKeyMap.place.length);
    } else if (line.startsWith(MetaKeyMap.time)) {
      meta.time = line.substring(MetaKeyMap.time.length);
    } else {
      for (const imageMatch of line.matchAll(MarkDownImageRgx)) {
        if (imageMatch.groups?.path) {
          photos.push({
            alt: imageMatch.groups?.alt,
            path: imageMatch.groups?.path,
          });
        }
      }
    }
  }

  return {
    meta,
    photos,
  };
};

export async function getAtlas(page = 1) {
  const url = `https://api.github.com/repos/hehehai/h-blog/issues?assignee=hehehai&labels=photos&sort=created&direction=desc&per_page=100&page=${page}`;

  const resData = await fetch(url);
  if (resData.status === 200) {
    const issues: Issue[] = await resData.json();
    return issues.map((issue) => {
      const { meta, photos } = atlasParser(issue.body);
      return {
        issuesId: issue.id,
        title: issue.title,
        ...meta,
        photos,
        labels: issue.labels.map((label) => ({
          id: label.id,
          name: label.name,
          color: label.color,
        })),
      };
    });
  }
  return [];
}
