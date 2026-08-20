"use client";

import { motion, useCycle, type Variants } from "motion/react";
import { type RefObject, useEffect, useRef } from "react";

interface PathProps {
  d?: string;
  transition?: { duration: number };
  variants?: Variants;
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    strokeWidth="3"
    {...props}
  />
);

const MenuToggle = ({ onToggle }: { onToggle: () => void }) => (
  <button
    className="absolute top-[14px] left-[28px] h-14 w-14 rounded-full bg-transparent"
    onClick={onToggle}
    type="button"
  >
    <svg height="23" viewBox="0 0 23 23" width="23">
      <title>Menu Toggle</title>
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        transition={{ duration: 0.1 }}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const menuItemVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    y: 50,
  },
  open: {
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    y: 0,
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem = ({ i }: { i: number }) => {
  const style = { border: `2px solid ${colors[i]}` };

  return (
    <motion.div
      className="flex cursor-pointer items-center gap-3"
      variants={menuItemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="h-10 w-10 rounded-md" style={style} />
      <div className="h-10 flex-grow rounded-md" style={style} />
    </motion.div>
  );
};

const navVariants: Variants = {
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.2, staggerChildren: 0.07 },
  },
};

const itemIds = [0, 1, 2, 3, 4];

const Navigation = () => (
  <motion.div className="ml space-y-6" variants={navVariants}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.div>
);

const sidebar: Variants = {
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      damping: 40,
      delay: 0.5,
      stiffness: 400,
      type: "spring" as const,
    },
  },
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      restDelta: 2,
      stiffness: 20,
      type: "spring" as const,
    },
  }),
};

function useDimensions(ref: RefObject<HTMLDivElement | null>) {
  const dimensions = useRef({ height: 0, width: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
}

export function FramerMenu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const navRef = useRef(null);
  const { height } = useDimensions(navRef);

  /*
  自定义参数 height 是用来为 variants 传递参数的，当 variants 内的值是函数的时，它是支持参数的，参数的是来自 custom 的
  variants 里 使用了 clip-path 属性 Cool！ framer 可以过渡它
  */

  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      className="absolute top-0 bottom-0 left-0 w-[300px] flex-col"
      custom={height}
      initial={false}
      ref={navRef}
    >
      <motion.div className="absolute inset-0 bg-white" variants={sidebar} />
      <div className="absolute inset-x-7 top-24">
        <Navigation />
      </div>
      <MenuToggle onToggle={() => toggleOpen()} />
    </motion.nav>
  );
}

export default function ExampleMenu() {
  return (
    <div className="relative h-[500px] w-full rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <FramerMenu />
    </div>
  );
}
