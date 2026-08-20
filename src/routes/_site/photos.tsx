import { createFileRoute } from "@tanstack/react-router";
import PhotoItem from "@/components/shared/photo/photo-item";
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
  const atlas = Route.useLoaderData();

  return (
    <div className="space-y-10">
      {atlas.map((item) => (
        <PhotoItem key={item.title} {...item} />
      ))}
    </div>
  );
}
