const AppCode = `import { styled } from '@stitches/react';
import { motion } from 'framer-motion';

const ListItem = styled(motion.li, {
  width: '100%',
  minWidth: '300px',
  background: '#FCFCFC',
  border: '1px solid #E2E2E2',
  borderRadius: '8px',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  marginBottom: '0px',
  color: '#151715',
  fontSize: 18,
});

const Button = styled('button', {
  background: 'transparent',
  cursor: 'pointer',
  border: 'none',
  shadow: 'none',
  color: '#151715',
  display: 'flex',
});

const InfoBox = styled('div', {
  width: '50%',
});

const ARTICLES = [
  {
    category: 'swift',
    title: 'Intro to SwiftUI',
    description: 'An article with some SwitftUI basics',
    id: 1,
  },
];

const Item = (props) => {
  const { article } = props;

  const readButtonVariants = {
    hover: {
      opacity: 1,
    },
    // 取消注释下面的变量，并注释掉上面的变量，注意按钮在悬停时不会显示出来。
    /*
    hoverme: {
        opacity: 1,
    },
    */
    initial: {
      opacity: 0,
    },
    magic: {
      rotate: 360,
      opacity: 1,
    },
  };

  return (
    <ListItem layout initial="initial" whileHover="hover">
      <InfoBox>{article.title}</InfoBox>
      <motion.div
        // 取消对我进行注释，并注意按钮现在会旋转并始终可见。
        // animate="magic"
        variants={readButtonVariants}
        transition={{ duration: 0.25 }}
      >
        <Button
          aria-label="read article"
          title="Read article"
          onClick={(e) => e.preventDefault()}
        >
          &#8594;
        </Button>
      </motion.div>
    </ListItem>
  );
};

const Example = () => <div className="p-3"><Item article={ARTICLES[0]} /></div>;

export default Example;`;

export default AppCode;
