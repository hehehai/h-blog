'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Box, Flex, Icon, styled } from '@maximeheckel/design-system';
import { motion } from 'motion/react';
import React from 'react';

const IconButton = styled(motion.button, {
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  color: 'inherit',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '0',
});

const ITEMS = [1, 2, 3];

const LayoutPosition = () => {
  const [items, setItems] = React.useState(ITEMS);
  const [position, setPosition] = React.useState(false);

  const codeString = position
    ? `<motion.div layout>
  <Label variant="success">
    <motion.div
      style={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
      }}
      layout="position"
    >
      <DismissButton/>
      <span>{text}</span>
    </motion.div>
  </Label>
</motion.div>`
    : `<motion.div layout>
  <Label variant="success">
    <div
      style={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
      }}
    >
      <DismissButton/>
      <span>{text}</span>
    </div>
  </Label>
</motion.div>`;

  return (
    <Card>
      <CardHeader>{`实际用例示例 layout="position"`}</CardHeader>
      <div>
        <div className="flex gap-2 px-4 py-3 max-md:flex-col">
          {items.map((item) => (
            <Box as={motion.div} css={{ flexGrow: 1 }} key={item} layout>
              <div className="flex-grow rounded-lg bg-green-400 px-4 py-2 dark:bg-green-700">
                <Flex
                  key={position}
                  as={motion.div}
                  layout={position ? 'position' : true}
                  justifyContent="start"
                  css={{ width: '100%' }}
                >
                  <IconButton
                    className="mr-2"
                    title="Dismiss label"
                    aria-label="Dismiss label"
                    onClick={() =>
                      setItems((prev) => prev.filter((label) => label !== item))
                    }
                  >
                    <Icon.X size={3} />
                  </IconButton>
                  <span>Label {item}</span>
                </Flex>
              </div>
            </Box>
          ))}
        </div>
        <div className="my-5 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={position}
              id="use-layout-position"
              onCheckedChange={() => setPosition((prev) => !prev)}
            />
            <Label htmlFor="use-layout-position">{`Use layout="position"`}</Label>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Reset"
                  aria-describedby="reset-tooltip"
                  size="icon"
                  onClick={() => setItems(ITEMS)}
                >
                  <Icon.Repeat />
                </Button>
              </TooltipTrigger>
              <TooltipContent>复位</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <pre className="m-0 block rounded-xl">
        <code>{codeString}</code>
      </pre>
    </Card>
  );
};

export default LayoutPosition;
