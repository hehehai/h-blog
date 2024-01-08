import { MutableRefObject, useEffect, useRef } from "react";
import { motion, useCycle, Variants } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute left-[28px] top-[14px] w-14 h-14 rounded-full bg-transparent"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
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
};

const menuItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem = ({ i }: { i: number }) => {
  const style = { border: `2px solid ${colors[i]}` };

  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer"
      variants={menuItemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-10 h-10 rounded-md" style={style} />
      <div className="flex-grow h-10 rounded-md" style={style} />
    </motion.div>
  );
};

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemIds = [0, 1, 2, 3, 4];

const Navigation = () => {
  return (
    <motion.div className="space-y-6 ml" variants={navVariants}>
      {itemIds.map((i) => (
        <MenuItem i={i} key={i} />
      ))}
    </motion.div>
  );
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function useDimensions(ref: MutableRefObject<HTMLDivElement | null>) {
  const dimensions = useRef({ width: 0, height: 0 });

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
      className="absolute flex-col left-0 top-0 bottom-0 w-[300px]"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={navRef}
    >
      <motion.div
        className="bg-white absolute inset-0"
        variants={sidebar}
      ></motion.div>
      <div className="absolute inset-x-7 top-24">
        <Navigation></Navigation>
      </div>
      <MenuToggle onToggle={() => toggleOpen()}></MenuToggle>
    </motion.nav>
  );
}

export function DemoMenuBox() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 relative rounded-lg">
      <FramerMenu></FramerMenu>
    </div>
  );
}
