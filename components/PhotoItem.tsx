import Image from "next/image";

export default function PhotoItem(props: any) {
  const { meta, folderPath } = props;

  return (
    <div>
      <div className="text-xl mb-4">{meta.name}</div>
      <div className="grid grid-cols-3 gap-4">
        {meta.images.map((imagePath: string) => (
          <div className="w-full h-72 relative" key={imagePath}>
            <Image
              src={`/photos/${folderPath}/${imagePath}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
