"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { type MouseEvent, useEffect, useState } from "react";
import ButtonFadeStyle from "./button-fade-style";
import { IconMoon, IconSun } from "./icons";
import { useTheme } from "./theme-provider";

const themeVariants: Variants = {
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
  },
  initial: (isMount: boolean) => ({
    opacity: isMount ? 0 : 1,
    x: isMount ? 10 : 0,
  }),
};

export default function ButtonThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);

  const handleToggleTheme = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <ButtonFadeStyle onClick={handleToggleTheme}>
      <AnimatePresence mode="wait">
        {resolvedTheme === "dark" ? (
          <motion.div
            animate="animate"
            className="text-2xl"
            custom={isMount}
            exit="exit"
            initial="initial"
            key="sun"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            variants={themeVariants}
          >
            <IconSun />
          </motion.div>
        ) : (
          <motion.div
            animate="animate"
            className="text-2xl"
            custom={isMount}
            exit="exit"
            initial="initial"
            key="moon"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            variants={themeVariants}
          >
            <IconMoon />
          </motion.div>
        )}
      </AnimatePresence>
    </ButtonFadeStyle>
  );
}
