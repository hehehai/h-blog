import { useTheme } from "next-themes";
import NextLink from "next/link";
import HeaderButton from "./HeaderButton";
import Github from "./icons/Github";
import Twitter from "./icons/Twitter";
import { AnimatePresence, Variants, motion } from "framer-motion";
import SunIcon from "./icons/Sun";
import MoonIcon from "./icons/Moon";
import { useEffect, useState } from "react";

const themeVariants: Variants = {
  initial: (isMount) => ({
    x: isMount ? 10 : 0,
    opacity: isMount ? 0 : 1,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -10,
    opacity: 0,
  },
};

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);

  const handleToggleTheme = (e: MouseEvent) => {
    e.preventDefault();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

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
              <motion.div
                key="sun"
                className="text-2xl"
                variants={themeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={isMount}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <SunIcon />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                className="text-2xl"
                variants={themeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={isMount}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <MoonIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </HeaderButton>
      </div>
    </div>
  );
}
