import { useTheme } from "next-themes";
import NextLink from "next/link";
import HeaderButton from "./HeaderButton";
import Github from "./icons/Github";
import Theme from "./icons/Theme";
import Twitter from "./icons/Twitter";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = (e: MouseEvent) => {
    e.preventDefault();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="md:flex justify-between items-center py-12">
      <div className="text-2xl font-medium">
        <NextLink href="/">Hehehai.cn</NextLink>
      </div>
      <div className="mt-5 md:mt-0 flex items-center space-x-4">
        <HeaderButton label="Github" link="https://github.com/hehehai">
          <Github size={24} />
        </HeaderButton>
        <HeaderButton label="Twitter" link="https://twitter.com/riverhohai">
          <Twitter size={20} />
        </HeaderButton>
        <HeaderButton onClick={handleToggleTheme}>
          <Theme size={24} theme={resolvedTheme} />
        </HeaderButton>
      </div>
    </div>
  );
}
