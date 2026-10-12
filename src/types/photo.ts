export interface Photo {
  alt?: string;
  path: string;
}

export interface PhotoLabel {
  color: string;
  id: number;
  name: string;
}

export interface AtlasMeta {
  description?: string;
  place?: string;
  time?: string;
}

export interface Atlas extends AtlasMeta {
  issuesId: number;
  labels: PhotoLabel[];
  photos: Photo[];
  title: string;
}

export type PhotoFailure =
  | "rate-limit"
  | "timeout"
  | "upstream"
  | "invalid-data";

export type PhotoLoadResult = {
  albums: Atlas[];
  reason: PhotoFailure | null;
  retryAfterSeconds: number;
  retryAt: number;
  status: "ready" | "stale" | "unavailable";
  updatedAt: number | null;
};
