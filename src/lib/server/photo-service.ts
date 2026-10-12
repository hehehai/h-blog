import { z } from "zod";
import { siteConfig } from "@/lib/config/site";
import { atlasParser } from "@/lib/photo-parser";
import type { PhotoFailure, PhotoLoadResult } from "@/types/photo";

const FRESH_MS = 5 * 60_000;
const STALE_MS = 24 * 60 * 60_000;
const RETRY_MS = 60_000;
const TIMEOUT_MS = 10_000;
const CACHE_NAME = "h-blog-photos-v1";

const labelSchema = z.object({
  color: z
    .string()
    .nullable()
    .transform((color) => color ?? ""),
  id: z.number().int(),
  name: z.string(),
});
const issuesSchema = z.array(
  z.object({
    body: z.string().nullable(),
    id: z.number().int(),
    labels: z.array(labelSchema),
    title: z.string(),
  })
);
const cacheEntrySchema = z.object({
  albums: z
    .array(
      z.object({
        description: z.string().optional(),
        issuesId: z.number().int(),
        labels: z.array(labelSchema),
        photos: z.array(
          z.object({ alt: z.string().optional(), path: z.string() })
        ),
        place: z.string().optional(),
        time: z.string().optional(),
        title: z.string(),
      })
    )
    .nullable(),
  freshUntil: z.number().nonnegative(),
  reason: z
    .enum(["rate-limit", "timeout", "upstream", "invalid-data"])
    .nullable(),
  retryAt: z.number().nonnegative(),
  updatedAt: z.number().nonnegative().nullable(),
});
type CacheEntry = z.infer<typeof cacheEntrySchema>;

class UpstreamError extends Error {
  readonly reason: PhotoFailure;
  readonly retryAt: number;

  constructor(response: Response) {
    super(`GitHub photos request failed: HTTP ${response.status}`);
    const now = Date.now();
    const retryAfter = response.headers.get("retry-after");
    const seconds = retryAfter === null ? Number.NaN : Number(retryAfter);
    const retryDate = retryAfter === null ? Number.NaN : Date.parse(retryAfter);
    const reset =
      response.headers.get("x-ratelimit-remaining") === "0"
        ? Number(response.headers.get("x-ratelimit-reset")) * 1000
        : 0;
    const rateLimited =
      response.status === 429 ||
      (response.status === 403 &&
        (response.headers.get("x-ratelimit-remaining") === "0" ||
          retryAfter !== null));

    this.reason = rateLimited ? "rate-limit" : "upstream";
    this.retryAt = Math.max(
      now + RETRY_MS,
      Number.isFinite(now + seconds * 1000) ? now + seconds * 1000 : 0,
      Number.isFinite(retryDate) && !Number.isFinite(seconds) ? retryDate : 0,
      rateLimited && Number.isFinite(reset) ? reset : 0
    );
  }
}

function cacheKey(page: number): Request {
  return new Request(new URL(`/_cache/photos?page=${page}`, siteConfig.host));
}

async function readCache(page: number): Promise<CacheEntry | undefined> {
  try {
    if (typeof caches === "undefined") {
      return;
    }
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(cacheKey(page));
    if (response) {
      return cacheEntrySchema.parse(await response.json());
    }
  } catch {
    // Cache availability must not determine whether the public page works.
  }
}

async function writeCache(page: number, entry: CacheEntry): Promise<void> {
  try {
    if (typeof caches === "undefined") {
      return;
    }
    const ttl = Math.max(
      entry.retryAt - Date.now(),
      entry.updatedAt === null ? 0 : entry.updatedAt + STALE_MS - Date.now()
    );
    const cache = await caches.open(CACHE_NAME);
    await cache.put(
      cacheKey(page),
      Response.json(entry, {
        headers: {
          "Cache-Control": `public, max-age=${Math.max(1, Math.ceil(ttl / 1000))}`,
        },
      })
    );
  } catch {
    // No isolate-global promises or binding requirements; fall back to live data.
  }
}

function toResult(entry: CacheEntry): PhotoLoadResult {
  return {
    albums: entry.albums ?? [],
    reason: entry.reason,
    retryAfterSeconds: Math.max(
      0,
      Math.ceil((entry.retryAt - Date.now()) / 1000)
    ),
    retryAt: entry.retryAt,
    status:
      entry.albums === null ? "unavailable" : entry.reason ? "stale" : "ready",
    updatedAt: entry.updatedAt,
  };
}

function classifyFailure(error: unknown): PhotoFailure {
  if (error instanceof UpstreamError) {
    return error.reason;
  }
  if (
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError")
  ) {
    return "timeout";
  }
  if (error instanceof z.ZodError || error instanceof SyntaxError) {
    return "invalid-data";
  }
  return "upstream";
}

function discardExpiredAlbums(
  entry: CacheEntry | undefined
): CacheEntry | undefined {
  if (
    entry &&
    entry.updatedAt !== null &&
    entry.updatedAt + STALE_MS <= Date.now()
  ) {
    return { ...entry, albums: null, freshUntil: 0, updatedAt: null };
  }
  return entry;
}

export async function loadPhotoAlbums(page: number): Promise<PhotoLoadResult> {
  const cached = discardExpiredAlbums(await readCache(page));
  const now = Date.now();

  if (cached && (cached.freshUntil > now || cached.retryAt > now)) {
    return toResult(cached);
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/hehehai/h-blog/issues?assignee=hehehai&labels=photos&sort=created&direction=desc&per_page=100&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "hehehai-h-blog",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }
    );
    if (!response.ok) {
      throw new UpstreamError(response);
    }
    const issues = issuesSchema.parse(await response.json());
    const updatedAt = Date.now();
    const entry: CacheEntry = {
      albums: issues.map((issue) => {
        const { meta, photos } = atlasParser(issue.body ?? "");
        return {
          ...meta,
          issuesId: issue.id,
          labels: issue.labels,
          photos,
          title: issue.title,
        };
      }),
      freshUntil: updatedAt + FRESH_MS,
      reason: null,
      retryAt: 0,
      updatedAt,
    };
    await writeCache(page, entry);
    return toResult(entry);
  } catch (error) {
    const reason = classifyFailure(error);
    console.warn("Photo albums unavailable", { page, reason });
    // A failed request must not extend the lifetime of stale photos, even when
    // their deadline was crossed while waiting for the upstream response.
    const fallback = discardExpiredAlbums(cached);
    const entry: CacheEntry = {
      albums: fallback?.albums ?? null,
      freshUntil: 0,
      reason,
      retryAt:
        error instanceof UpstreamError ? error.retryAt : Date.now() + RETRY_MS,
      updatedAt: fallback?.updatedAt ?? null,
    };
    await writeCache(page, entry);
    return toResult(entry);
  }
}
