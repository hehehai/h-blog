import NavItem from "./NavItem";

export default function Navigator() {
  return (
    <div className="flex items-center space-x-10 py-6 mt-5">
      <NavItem href="/about" text="关于我" />
      <NavItem href="/posts" text="文章" />
      <NavItem href="/projects" text="项目" />
      <NavItem href="/photos" text="照片" />
    </div>
  );
}
