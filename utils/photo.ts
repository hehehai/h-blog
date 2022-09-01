import fs from 'fs'
import path from 'path'

export const PHOTOS_PATH = path.join(process.cwd(), 'data/photos')

export const photoMetaPaths = fs
  .readdirSync(PHOTOS_PATH)
  // Only include json files
  .filter((path) => /\.json$/.test(path))

