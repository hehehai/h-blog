const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <div className="mt-20 flex items-center py-8 text-sm">
      <span>© 2019 - {currentYear}, Hehehai </span>
    </div>
  );
}
