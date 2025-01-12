const AppCode = `import { motion } from 'framer-motion';

const Example1 = () => {
  return (
    <div style={{ marginBottom: '50px' }}>
      <p className="mb-5">Example 1</p>
      <motion.div
        style={{
          background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
          height: '100px',
          width: '100px',
          borderRadius: '10px',
        }}
        /**
         下面，初始化和动画字段被设置为进行沿水平轴“x”的平移动画。
         因此我们在两个对象中都设置了一个“x”字段。
        **/
        initial={{
          x: -100,
        }}
        animate={{
          x: 100,
        }}
        /**
         以下代码指定了元素的过渡类型。
         您可以将下面的整个过渡属性注释掉， Framer Motion 将回退到“智能默认值”。

         在这种情况下，由于我们有一个平移动画，所以默认的过渡类型是弹簧(spring)，所以您应该会看到元素从左到右移动，并在达到目标状态时出现"弹跳"，就像弹簧一样！
        **/
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 1,
          duration: 2,
        }}
      />
    </div>
  );
};

const Example2 = () => {
  return (
    <div style={{ marginBottom: '50px' }}>
      <p className="mb-5">Example 2</p>
      <motion.div
        style={{
          background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
          height: '100px',
          width: '100px',
          borderRadius: '10px',
        }}
        /**
         在 Framer Motion 中组合动画非常简单！
         您只需向初始和目标对象添加额外的字段即可。
         例如，在这里，我们的元素在 0 度和 180 度之间旋转，如果我们想同时进行水平平移，我们可以简单地添加一个"x"字段，就像上面的示例中一样。
         
         我在下面添加了这些字段，并进行了注释。如果您取消对它们的注释，您应该会看到我们的元素同时旋转和平移。
         
         您可以尝试将平移从水平变为垂直，只需将"x"字段替换为"y"字段即可。
        **/
        initial={{
          rotate: 0,
          // x: -100
        }}
        animate={{
          rotate: 180,
          // x: 100
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 1,
          duration: 2,
        }}
      />
    </div>
  );
};

const Examples = () => (
  <div className="flex flex-col items-center p-2">
    <Example1 />
    <Example2 />
  </div>
);

export default Examples;`;

export default AppCode;
