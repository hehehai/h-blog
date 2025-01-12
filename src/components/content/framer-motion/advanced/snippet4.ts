const AppCode = `import { styled } from '@stitches/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React from 'react';
import Pill from './Pill';

const List = styled(motion.ul, {
  padding: '16px',
  maxWidth: '340px',
  background: ' hsl(223, 15%, 10%)',
  borderRadius: '8px',
  display: 'grid',
  gap: '16px',
});


const ListItem = styled(motion.li, {
  width: '100%',
  background: 'hsla(222, 89%, 65%, 10%)',
  boxShadow: '0 0px 10px -6px rgba(0, 24, 40, 0.3)',
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  marginBottom: '0px',
  color: 'hsl(223, 15%, 65%)',
  fontSize: 18,
});

const Button = styled('button', {
  background: 'transparent',
  cursor: 'pointer',
  border: 'none',
  shadow: 'none',
  color: 'hsl(223, 15%, 65%)',
  display: 'flex',
});

const InfoBox = styled('div', {
  width: '50%',
});

const FilterWrapper = styled('div', {
  marginBottom: '16px',
  input: {
    marginRight: '4px',
  },
  label: {
    marginRight: '4px',
  },
});

const Title = motion.div;

const ARTICLES = [
  {
    category: 'swift',
    title: 'Intro to SwiftUI',
    description: 'An article with some SwitftUI basics',
    id: 1,
  },
  {
    category: 'js',
    title: 'Awesome React stuff',
    description: 'My best React tips!',
    id: 2,
  },
  {
    category: 'js',
    title: 'Styled components magic',
    description: 'Get to know ways to use styled components',
    id: 3,
  },
  {
    category: 'ts',
    title: 'A guide to Typescript',
    description: 'Type your React components!',
    id: 4,
  },
];

const categoryToVariant = {
  js: 'warning',
  ts: 'info',
  swift: 'danger',
};

const Item = (props) => {
  const { article, showCategory, expanded, onClick } = props;

  const readButtonVariants = {
    hover: {
      opacity: 1,
    },
    initial: {
      opacity: 0,
    },
  };

  return (
    <ListItem layout initial="initial" whileHover="hover" onClick={onClick}>
      <InfoBox>
        {/*
          尝试将“布局”道具添加到此运动组件，并注意它现在如何随着列表项展开而优雅地移动
        */}
        <Title
        // layout
        >
          {article.title}
        </Title>
        <AnimatePresence>
          {expanded && (
            <motion.div
              style={{ fontSize: '12px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {article.description}
            </motion.div>
          )}
        </AnimatePresence>
      </InfoBox>
      <AnimatePresence>
        {showCategory && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Pill variant={categoryToVariant[article.category]}>
              {article.category}
            </Pill>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        layout
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

const Component = () => {
  const [showCategory, setShowCategory] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('title');
  const [expanded, setExpanded] = React.useState(null);

  const onSortChange = (event) => setSortBy(event.target.value);

  const articlesToRender = ARTICLES.sort((a, b) => {
    const itemA = a[sortBy].toLowerCase();
    const itemB = b[sortBy].toLowerCase();

    if (itemA < itemB) {
      return -1;
    }
    if (itemA > itemB) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="p-3">
      <FilterWrapper>
        <div>
          <input
            type="checkbox"
            id="showCategory2"
            checked={showCategory}
            onChange={() => setShowCategory((prev) => !prev)}
          />
          <label htmlFor="showCategory2">显示类别</label>
        </div>
        <div>
          排序方式:{' '}
          <input
            type="radio"
            id="title"
            name="sort"
            value="title"
            checked={sortBy === 'title'}
            onChange={onSortChange}
          />
          <label htmlFor="title">标题</label>
          <input
            type="radio"
            id="category"
            name="sort"
            value="category"
            checked={sortBy === 'category'}
            onChange={onSortChange}
          />
          <label htmlFor="category">类别</label>
        </div>
      </FilterWrapper>
      {/*
        由于此列表中的每个布局动画会影响其他布局，我们必须将它们包装在 LayoutGroup 中。尝试移除它！你应该会注意到以下情况：

        在没有 LayoutGroup 的情况下，点击列表项时同时进行的布局动画会显得“不流畅”。
        在使用 LayoutGroup 的情况下，点击列表项时同时进行的布局动画会更加优雅。
      */}
      <LayoutGroup>
        <List layout>
          {articlesToRender.map((article) => (
            <Item
              key={article.id}
              expanded={expanded === article.id}
              onClick={() => setExpanded(article.id)}
              article={article}
              showCategory={showCategory}
            />
          ))}
        </List>
      </LayoutGroup>
    </div>
  );
};

export default Component;`;

export default AppCode;
