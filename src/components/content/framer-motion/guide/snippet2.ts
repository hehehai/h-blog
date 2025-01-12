const AppCode = `import { motion } from 'framer-motion';
import React from 'react';

const Example = () => {
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    if (isClicked) {
      setTimeout(() => setIsClicked(false), 3000);
    }
  }, [isClicked]);

  const duration = 0.6;
  const buttonVariants = {
    hover: {
      /**
       * 在变体中组合不同的动画与内联动画对象的方式相同。
       * 对于第一个示例，要使按钮缩放，您只需取消下面的注释。
       * 完成后，将鼠标悬停在按钮上，注意它现在会变为原来的两倍大小！
       */
      // scale: 2,
      rotate: 360,
    },
    pressed: {
      scale: 0.95,
    },
    clicked: {
      scale: 1,
    },
    notClicked: {
      scale: 1,
    },
  };

  /**
   * 请将上面的buttonVariants对象注释掉，并取消下面的注释以尝试第二个示例：
   *
   * - 单击按钮后，按钮不会缩放回其基本大小。
   * - 单击后，悬停动画将不会发生。
   * - 它将使用下面传递给按钮组件的“isClicked”自定义属性。
   */

  /* 
  const buttonVariants = {
    hover: (isClicked) => ({
      scale: isClicked ? 2 : 3,
      rotate: isClicked ? 0 : 360,
    }),
    pressed: {
      scale: 0.95,
    },
    clicked: {
      scale: 2,
    },
    notClicked: {
      scale: 1,
    },
  };
  */

  return (
    <div className="py-16 flex items-center justify-center">
      <motion.button
        style={{
          background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
          color: 'black',
          border: 'none',
          height: '50px',
          width: '200px',
          borderRadius: '10px',
          cursor: isClicked ? 'default' : 'pointer',
          outline: 'none',
          boxShadow: '6px 4px 12px -6px rgba(0,24,40,0.25)',
        }}
        aria-label="Click Me!"
        title="Click Me!"
        onClick={() => {
          setIsClicked(true);
        }}
        /**
         * 在这里，我们将 buttonVariants 对象作为变体传递。
         * 它包含4个不同的目标对象：
         *
         * hover： 用于 whileHover 属性
         * pressed： 用于 whileTap 属性
         * clicked 和 notClicked： 分别用于按钮在点击和未点击时的 animate 属性（根据按钮的状态）
         * 对这些动画对象的引用以字符串形式传递给它们的属性。
         *
         * e.g. whileHover="hover"
         */
        variants={buttonVariants}
        animate={isClicked ? 'clicked' : 'notClicked'}
        whileHover="hover"
        whileTap="pressed"
        /**
         * 取消下面的注释，让我们的 buttonVariants 对象了解按钮的状态。
         * 
         * 这使我们能够根据按钮的状态重新定义变体。
         */
        // custom={isClicked}
        transition={{
          duration,
        }}
      >
        {isClicked ? 'Clicked!' : 'Click Me!'}
      </motion.button>
    </div>
  );
};

export default Example;`;

export default AppCode;
