export default function Footer() {
  const currentYear = new Date().getFullYear();

  return <div className="py-8 mt-20">© 2019 - {currentYear}, Hehehai</div>;
}
