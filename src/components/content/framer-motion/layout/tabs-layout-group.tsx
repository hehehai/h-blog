'use client';

import { Card } from '@/components/ui/card';
import { Box, Text } from '@maximeheckel/design-system';
import { LayoutGroup, motion } from 'motion/react';
import React from 'react';

const TabsSharedLayoutAnimation = () => {
  const [focused, setFocused] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState('Item 1');
  const tabs = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div
      className="flex items-center justify-center gap-8 rounded-lg border border-[#2B303B] bg-[#1A1D23] px-4 py-2"
      onMouseLeave={() => setFocused(null)}
    >
      {tabs.map((item) => (
        <Box
          as="div"
          css={{
            position: 'relative',
            listStyle: 'none',
            cursor: 'pointer',
            width: '60px',
            height: '30px',
            outline: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={item}
          onClick={() => setSelected(item)}
          onKeyDown={(event: { key: string }) =>
            event.key === 'Enter' ? setSelected(item) : null
          }
          onFocus={() => setFocused(item)}
          onMouseEnter={() => setFocused(item)}
          tabIndex={0}
        >
          <Text
            size="1"
            css={{
              color: '#E8E8FD',
              position: 'absolute',
              left: 4,
              right: 0,
              top: 2,
              bottom: 0,
              zIndex: 1,
              userSelect: 'none',
              lineHeight: '1.5',
            }}
          >
            {item}
          </Text>

          {focused === item ? (
            <Box
              as={motion.div}
              transition={{
                layout: {
                  duration: 0.2,
                  ease: 'easeOut',
                },
              }}
              css={{
                position: 'absolute',
                bottom: '-2px',
                left: '-10px',
                right: 0,
                width: '140%',
                height: '110%',
                background: '#23272F',
                borderRadius: '8px',
                zIndex: 0,
              }}
              layoutId="highlight"
            />
          ) : null}
          {selected === item ? (
            <Box
              as={motion.div}
              css={{
                position: 'absolute',
                bottom: '-10px',
                left: '0px',
                right: 0,
                height: '4px',
                background: '#5686F5',
                borderRadius: '8px',
                zIndex: 0,
              }}
              layoutId="underline"
            />
          ) : null}
        </Box>
      ))}
    </div>
  );
};

const TabsLayoutGroup = (props: { layoutGroup: boolean }) => {
  const { layoutGroup } = props;

  const codeString = `const Tabs = ({ id }) => {
  const [focused, setFocused]
    = React.useState(null);
  const [selected, setSelected]
    = React.useState('Item 1');
  const tabs = [
    'Item 1', 
    'Item 2', 
    'Item 3'
  ];

  return (
    <LayoutGroup id={id}>
      <Wrapper
        onMouseLeave={() => 
          setFocused(null)
        }
      >
        {tabs.map((item) => (
          <Tab {/*...*/}>
  {/* Tab implementation... */}
          </Tab>
        )}
      </Wrapper>
    </LayoutGroup>
  );`;

  return (
    <Card>
      <div className="mx-auto flex max-w-[380px] flex-col items-center space-y-4 py-10">
        {layoutGroup ? (
          <>
            <LayoutGroup id="tab1">
              <TabsSharedLayoutAnimation />
            </LayoutGroup>
            <LayoutGroup id="tab2">
              <TabsSharedLayoutAnimation />
            </LayoutGroup>
          </>
        ) : (
          <>
            <TabsSharedLayoutAnimation />
            <TabsSharedLayoutAnimation />
          </>
        )}
      </div>
      {layoutGroup ? (
        <pre className="m-0 block rounded-xl">
          <code>{codeString}</code>
        </pre>
      ) : null}
    </Card>
  );
};

export default TabsLayoutGroup;
