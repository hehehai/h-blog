export default function Footer({ currentYear }: { currentYear: number }) {
  return (
    <div className="mt-20 flex items-center py-8 text-sm">
      <span>© 2019 - {currentYear}, Hehehai </span>
    </div>
  );
}
