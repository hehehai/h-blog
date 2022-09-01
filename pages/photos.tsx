import fs from "fs";
import path from "path";
import Image from "next/image";
import Container from "../components/Container";
import { photoMetaPaths, PHOTOS_PATH } from "../utils/photo";

export default function Photos({ photos }: any) {
  return (
    <Container>
      <div>Photos</div>
      <div>
        {photos.map((photo: any, idx: number) => (
          <div key={idx}>
            <div>{photo.meta.name}</div>
            <div>
              {photo.meta.images.map((imagePath: any) => (
                <Image src={`/photos/${photo.folderPath}/${imagePath}`} key={imagePath} width={200} height={200} />
              ))}
            </div>
          </div>
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
      folderPath: filePath.replace(".json", ''),
    };
  });

  return { props: { photos } };
}
