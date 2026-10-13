import { createFileRoute } from "@tanstack/react-router";
import { PageHeading } from "@/components/shared/page-heading";
import PhotoItem from "@/components/shared/photo/photo-item";
import { PhotoStatus } from "@/components/shared/photo/photo-status";
import { getAtlas } from "@/functions/photo";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/_site/photos")({
  component: Photos,
  head: () =>
    createSeoHead({
      description: "记录生活与旅途的照片集。",
      path: "/photos",
      title: "照片 | Hehehai @一块木头",
    }),
  loader: () => getAtlas({ data: { page: 1 } }),
});

function Photos() {
  const result = Route.useLoaderData();

  return (
    <div className="photos-page">
      <PageHeading
        description="离开屏幕之后，记录生活与旅途里值得停留的瞬间。"
        eyebrow="生活的切片"
        title="看见，留住。"
      />
      <PhotoStatus result={result} />
      {result.status === "ready" && result.albums.length === 0 && (
        <div className="content-placeholder">
          <p className="eyebrow">照片集 · 待补充</p>
          <p>还没有照片，新的生活片段将在这里更新。</p>
        </div>
      )}
      {result.albums.map((item) => (
        <PhotoItem key={item.issuesId} {...item} />
      ))}
    </div>
  );
}
