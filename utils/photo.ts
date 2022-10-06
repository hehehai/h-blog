import { AtlasMeta, Photo } from '../pages/interface/photo'

const MetaKeyMap: Record<keyof AtlasMeta, string> = {
  description: 'Description: ',
  place: 'Place: ',
  time: 'Time: ',
}

const MarkDownImageRgx = /!\[(?<alt>[^\]]*)\]\((?<path>.*?)(?=\"|\))\)/g

export const atlasParser = (body: string) => {
  const lines = body.split('\r\n')
  const meta: AtlasMeta = {}
  const photos: Photo[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith(MetaKeyMap.description)) {
      meta.description = line.substring(MetaKeyMap.description.length)
    } else if (line.startsWith(MetaKeyMap.place)) {
      meta.place = line.substring(MetaKeyMap.place.length)
    } else if (line.startsWith(MetaKeyMap.time)) {
      meta.time = line.substring(MetaKeyMap.time.length)
    } else {
      for (let imageMatch of line.matchAll(MarkDownImageRgx)) {
        if (imageMatch.groups?.path) {
          photos.push({
            alt: imageMatch.groups?.alt,
            path: imageMatch.groups?.path
          })
        }
      }
    }
  }

  return {
    meta,
    photos
  }
}
