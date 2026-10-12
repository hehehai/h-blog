import { createServerFn } from "@tanstack/react-start";
import { loadPhotoAlbums } from "@/lib/server/photo-service";
import { photoQuerySchema } from "@/lib/server-input";

export const getAtlas = createServerFn({ method: "GET" })
  .validator(photoQuerySchema)
  .handler(({ data: { page } }) => loadPhotoAlbums(page));
