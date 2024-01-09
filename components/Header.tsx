import { useTheme } from "next-themes";
import NextLink from "next/link";
import HeaderButton from "./HeaderButton";
import Github from "./icons/Github";
import Twitter from "./icons/Twitter";
import { AnimatePresence } from "framer-motion";
import SunIcon from "./icons/Sun";
import MoonIcon from "./icons/Moon";

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
          <Github className="text-2xl" />
        </HeaderButton>
        <HeaderButton label="X.com" link="https://twitter.com/riverhohai">
          <Twitter className="text-2xl" />
        </HeaderButton>
        <HeaderButton onClick={handleToggleTheme}>
          <AnimatePresence mode="wait">
            {resolvedTheme === "dark" ? (
              <SunIcon
                key="sun"
                className="text-2xl"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : (
              <MoonIcon
                key="moon"
                className="text-2xl"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </HeaderButton>
      </div>
    </div>
  );
}
