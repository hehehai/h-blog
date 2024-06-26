const AppCode = `import { styled } from '@stitches/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const SwitchWrapper1 = styled(motion.div, {
  width: '50px',
  height: '30px',
  borderRadius: '20px',
  cursor: 'pointer',
  display: 'flex',
  padding: '2px',
  alignItems: 'center',
});

const SwitchHandle1 = styled(motion.div, {
  background: '#fff',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
});

// 尝试在没有布局动画的情况下使用Switch运动组件：它根本行不通
const Switch1 = () => {
  const [active, setActive] = React.useState(false);

  const switchVariants = {
    initial: {
      backgroundColor: '#111',
    },
    animate: (active) => ({
      backgroundColor: active ? '#f90566' : '#111',
      justifyContent: active ? 'flex-end' : 'flex-start',
    }),
  };

  return (
    <SwitchWrapper1
      initial="initial"
      animate="animate"
      onClick={() => setActive((prev) => !prev)}
      variants={switchVariants}
      custom={active}
    >
      <SwitchHandle1 />
    </SwitchWrapper1>
  );
};

const SwitchWrapper2 = styled('div', {
  width: '50px',
  height: '30px',
  borderRadius: '20px',
  cursor: 'pointer',
  display: 'flex',
  background: '#111',
  justifyContent: 'flex-start',
  padding: '2px',
  alignItems: 'center',

  '&[data-isactive="true"]': {
    background: '#f90566',
    justifyContent: 'flex-end',
  },
});

const SwitchHandle2 = styled(motion.div, {
  background: '#fff',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
});

// Simpler version of the Switch motion component using layout animation
const Switch2 = () => {
  const [active, setActive] = React.useState(false);

  return (
    <SwitchWrapper2
      data-isactive={active}
      onClick={() => setActive((prev) => !prev)}
    >
      <SwitchHandle2 layout />
    </SwitchWrapper2>
  );
};

const Example = () => (
  <div className="p-3">
    <p className="mb-2">
      Switch 1: 尝试在 Framer Motion 动画对象中对 justify-content 进行动画处理。
    </p>
    <Switch1 />
    <br />
    <p className="mb-2">
      Switch 2: 使用布局动画和 layout 属性来对 justify-content 进行动画处理。
    </p>
    <Switch2 />
  </div>
);

export default Example;`;

export default AppCode;
