import { z } from "zod";
import { isPostSlug } from "./post-path";

export const postInputSchema = z.object({
  slug: z.string().refine(isPostSlug, "Invalid post slug"),
});

export const postQuerySchema = z
  .object({
    limit: z.number().int().min(1).max(1000).default(10),
    offset: z.number().int().nonnegative().default(0),
  })
  .prefault({});

export const photoQuerySchema = z
  .object({
    page: z.number().int().min(1).max(1000).default(1),
  })
  .prefault({});
