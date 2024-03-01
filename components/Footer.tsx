export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-8 mt-20 flex items-center">
      <span>© 2019 - {currentYear}, Hehehai </span>
      <a
        href="http://beian.miit.gov.cn/"
        target="_blank"
        rel="noreferrer"
        className="ml-2 text-foreground/90"
        title="备案号"
      >
        晋ICP备2024032508号-1
      </a>
    </div>
  );
}
