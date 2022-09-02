export default function Tag(props: { label: string }) {
  const { label } = props;

  return <div className="text-sm underline decoration-1 underline-offset-2">{label}</div>;
}

export const renderTag = (tags: string[] | string) => {
  const tagArr = Array.isArray(tags)
    ? tags
    : tags.split(",").map((tag: any) => tag.trim());

  return (
    <div className="flex justify-content space-x-2">
      <span>标签: </span>
      {tagArr.map((tag: any) => (
        <Tag key={tag} label={tag} />
      ))}
    </div>
  );
};
