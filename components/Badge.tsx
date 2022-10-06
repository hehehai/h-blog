export default function Badge(props: { label: string }) {
  const { label } = props;

  if (!label) {
    return null;
  }

  return (
    <div className="text-xs rounded px-1.5 py-0.5 border rounded">{label}</div>
  );
}

export const renderBadge = (badges: string[] | string) => {
  const badgeArr = Array.isArray(badges)
    ? badges
    : badges.split(",").map((badge: any) => badge.trim());

  return (
    <div className="flex justify-content space-x-2">
      {badgeArr.map((badge: any) => (
        <Badge key={badge} label={badge} />
      ))}
    </div>
  );
};
