const AppCode = `import { motion, useMotionValue, useTransform } from 'framer-motion';

const Example = () => {
  const blockVariants = {
    initial: {
      rotate: 0,
    },
    target: {
      rotate: 360,
    },
  };

  const rotate = useMotionValue(0);
  /**
   * 在这里，我们将 "scale" 的值与 "rotate" 的值关联起来。
   * 缩放将随着旋转增加，从 0 到旋转达到 270 度（[0, 270]），此时缩放属性将等于 1（[0, 1]）。
   * 在旋转完成过渡时，缩放将停止增加。
   * 
   * 您可以尝试修改下面的值，看看它对最终的过渡有什么影响。
   */
  const scale = useTransform(rotate, [0, 270], [0, 1]);

  return (
    <div className="py-16 flex items-center justify-center">
      <motion.div
        style={{
          background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
          height: '100px',
          width: '100px',
          borderRadius: '10px',
          rotate,
          scale,
        }}
        variants={blockVariants}
        initial="initial"
        animate="target"
        transition={{
          ease: 'easeInOut',
          duration: 4,
        }}
      />
    </div>
  );
};

export default Example;`;

export default AppCode;
