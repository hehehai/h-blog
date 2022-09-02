import fs from "fs";
import path from "path";
import Container from "../components/Container";
import PhotoItem from "../components/PhotoItem";
import { photoMetaPaths, PHOTOS_PATH } from "../utils/photo";

export default function Photos({ photos }: any) {
  return (
    <Container>
      <div className="space-y-10">
        {photos.map((photo: any, idx: number) => (
          <PhotoItem key={idx} {...photo} />
        ))}
      </div>
    </Container>
  );
}

export function getStaticProps() {
  const photos = photoMetaPaths.map((filePath) => {
    const source = fs.readFileSync(path.join(PHOTOS_PATH, filePath));
    const meta = JSON.parse(source.toString());

    return {
      meta,
      folderPath: filePath.replace(".json", ""),
    };
  });

  return { props: { photos } };
}
