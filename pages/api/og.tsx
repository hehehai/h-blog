import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const ogTemplateImg = await fetch(
    new URL("../../assets/og-template.jpg", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await fetch(
    new URL("../../assets/MiSans-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const title = searchParams.get("title") ?? "";
  const tags: string[] = (searchParams.get("tags") ?? "").split(",") ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "black",
          background: "#ffffff",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <img
          width="100%"
          height="100%"
          src={ogTemplateImg as any}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px 146px 110px 146px",
          }}
        >
          <div style={{ fontSize: 44, fontFamily: '"MiSans"' }}>{title}</div>
          <div style={{ fontSize: 20, display: "flex", marginTop: 30 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 20,
                  marginRight: 16,
                  border: "1px solid #333",
                  borderRadius: "999em",
                  padding: "5px 12px 6px 12px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "MiSans",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
