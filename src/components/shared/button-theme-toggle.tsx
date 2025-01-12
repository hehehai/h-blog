'use client';

import { AnimatePresence, type Variants, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { type MouseEvent, useEffect, useState } from 'react';
import ButtonFadeStyle from './button-fade-style';
import { IconMoon, IconSun } from './icons';

const themeVariants: Variants = {
  initial: (isMount: boolean) => ({
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

export default function ButtonThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);

  const handleToggleTheme = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <ButtonFadeStyle onClick={handleToggleTheme}>
      <AnimatePresence mode="wait">
        {resolvedTheme === 'dark' ? (
          <motion.div
            key="sun"
            className="text-2xl"
            variants={themeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={isMount}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <IconSun />
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <IconMoon />
          </motion.div>
        )}
      </AnimatePresence>
    </ButtonFadeStyle>
  );
}
