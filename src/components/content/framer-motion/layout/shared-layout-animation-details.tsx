'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Box, Flex, Icon } from '@maximeheckel/design-system';
import { motion } from 'motion/react';
import React from 'react';

const ITEMS = [1, 2, 3];
const COLORS = ['var(--accent)', 'var(--pink-500)', 'var(--orange-900)'];

const SharedLayoutAnimationDetails = () => {
  const [selected, setSelected] = React.useState(1);
  const [duration, setDuration] = React.useState(0.3);

  return (
    <Card>
      <CardHeader>共享布局动画调试器</CardHeader>
      <div className="flex flex-col items-center">
        <div className="flex gap-4">
          {ITEMS.map((item, index) => (
            <Flex
              key={item}
              direction="column"
              justifyContent="space-between"
              css={{
                cursor: 'pointer',
                '&:focus': { outline: 'none' },
                '&:focus-visible': {
                  outline: '1px solid var(--accent)',
                },
              }}
              onClick={() => setSelected(item)}
              tabIndex={0}
            >
              <Box css={{ height: '24px' }}>Item {item}</Box>
              {item === selected ? (
                <Box
                  as={motion.div}
                  css={{ height: '24px' }}
                  layoutId="arrow"
                  transition={{
                    layout: {
                      duration,
                    },
                  }}
                >
                  <Icon.Arrow
                    style={{
                      color: COLORS[index],
                      transform: 'rotate(-90deg)',
                    }}
                  />
                </Box>
              ) : null}
            </Flex>
          ))}
        </div>
        <div className="mt-5 mb-10 w-[300px]">
          <div className="space-y-3">
            <Label htmlFor="damping">
              转场持续时间: <Badge>{duration}s</Badge>
            </Label>
            <Slider
              value={[duration]}
              min={0.2}
              step={0.1}
              max={2}
              onValueChange={([val]) => setDuration(val)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SharedLayoutAnimationDetails;
