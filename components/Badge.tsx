const badgeMap = {
  news: {
    label: "最新",
    color: "white",
    background: "#8b5cf6",
  },
  translate: {
    label: "翻译",
    color: "white",
    background: "#22c55e",
  },
  docs: {
    label: "文档",
    color: "white",
    background: "#0ea5e9",
  },
};

export default function Badge(props: { type: "news" | "translate" | "docs" }) {
  const { type } = props;

  const typeData = badgeMap[type];

  if (!typeData) {
    return null;
  }

  return (
    <div
      className="text-xs rounded px-1.5 py-0.5"
      style={{
        color: typeData.color,
        background: typeData.background,
      }}
    >
      {typeData.label}
    </div>
  );
}

export const renderBadge = (badges: string[] | string) => {
  const badgeArr = Array.isArray(badges)
    ? badges
    : badges.split(",").map((badge: any) => badge.trim());

  return (
    <div className="flex justify-content space-x-2">
      {badgeArr.map((badge: any) => (
        <Badge key={badge} type={badge} />
      ))}
    </div>
  );
};
