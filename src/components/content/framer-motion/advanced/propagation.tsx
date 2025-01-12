'use client';

import { Button } from '@/components/ui/button';
import { Card as DesignSystemCard } from '@/components/ui/card';
import { Flex, H3, Icon, Shadows, styled } from '@maximeheckel/design-system';
import { motion } from 'motion/react';
import React from 'react';
import { AnimationCardContent } from '../common-styled';

const CardWrapper = styled('div', {
  position: 'relative',
  width: '300px',
  height: '200px',
});

const Wrapper = styled(motion.div, {
  position: 'relative',
  cursor: 'default',
});

const CaptureLayer = styled(motion.div, {
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '32px',
  background:
    'repeating-linear-gradient(-45deg, #15181e, #15181e 5px, rgba(92, 135, 246, 0.07) 5px, rgba(92, 135, 246, 0.07) 10px)',
  opacity: 0.6,

  zIndex: '3',
  transformStyle: 'preserve-3d',
  boxShadow: `1px 1px 0 1px #16181D,
    -1px 0 28px 0 rgb(34 33 81 / 1%), 28px 28px 28px 0 rgb(34 33 81 / 25%)`,
  transition: '0.4s ease-in-out box-shadow, 0.4s ease-in-out opacity',

  '&:hover': {
    boxShadow: `1px 1px 0 1px #16181D,
      -1px 0 28px 0 rgba(34, 33, 81, 0.01),
      54px 54px 28px -10px rgba(34, 33, 81, 0.15)`,
  },

  variants: {
    show: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

const Glow = styled(motion.div, {
  background:
    'linear-gradient(104.01deg, rgb(155, 235, 235) 5.51%, rgb(15, 166, 233) 98.93%)',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  webkitFilter: 'blur(15px)',
  filter: 'blur(15px)',
  borderRadius: '32px',
});

const Card = styled('div', {
  borderRadius: '32px',
  border: '1px solid rgba(92, 135, 246, 0.7)',
  marginBottom: '0px',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'rgba(31, 36, 45, 0.5)',
  boxShadow: Shadows[2],
  height: '100%',
  div: {
    color: 'var(--text-tertiary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
  },
});

const CardWithGlow = () => {
  const glowVariants = {
    hover: (inPerspective: boolean) => ({
      opacity: 0.8,
      translateX: inPerspective ? 35 : 0,
      translateY: inPerspective ? 35 : 0,
    }),
    initial: {
      opacity: 0,
    },
  };

  const tagVariants = {
    hover: {
      opacity: 1,
    },
    initial: {
      opacity: 0,
    },
  };

  const topLayerVariants = {
    hover: {
      translateX: -25,
      translateY: -10,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    initial: {
      translateX: -10,
      translateY: 5,
    },
  };

  const layerVariants = {
    active: (inPerspective: boolean) => ({
      rotateX: inPerspective ? 51 : 0,
      rotateY: 0,
      rotateZ: inPerspective ? 43 : 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
    initial: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const [inPerspective, setInPerspective] = React.useState(false);

  return (
    <Flex
      alignItems="center"
      direction="column"
      css={{
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <Wrapper
        initial="initial"
        whileHover="hover"
        whileTap="hover"
        animate="active"
        custom={inPerspective}
        variants={layerVariants}
      >
        <CaptureLayer show={inPerspective} variants={topLayerVariants} />
        <H3>Hover me!</H3>
        <br />
        <br />
        <CardWrapper>
          <Glow variants={glowVariants} custom={inPerspective} />
          <Card>
            <div>✨ It&apos;s magic! ✨</div>
          </Card>
        </CardWrapper>
        {inPerspective ? (
          <motion.div
            style={{
              position: 'absolute',
              fontSize: '12px',
              top: '-55px',
              maxWidth: '250px',
            }}
            variants={tagVariants}
          >
            {`顶层： 动画组件包装器在悬停时设置变量"hover"`}
          </motion.div>
        ) : null}
        {inPerspective ? (
          <motion.div
            style={{
              position: 'absolute',
              fontSize: '12px',
              bottom: '-75px',
              right: '-15px',
              maxWidth: '250px',
            }}
            variants={tagVariants}
          >
            {`底层： "Glow" 动画组件使用悬停变量`}
          </motion.div>
        ) : null}
      </Wrapper>
      <Button
        size="icon"
        className="mt-10"
        variant="outline"
        title={inPerspective ? 'Disable perspective' : 'Enable perspective'}
        onClick={() => setInPerspective((prev) => !prev)}
      >
        <Icon.Stack />
      </Button>
    </Flex>
  );
};

const FramerMotionPropagation = () => {
  return (
    <DesignSystemCard className="py-10">
      <AnimationCardContent>
        <CardWithGlow />
      </AnimationCardContent>
    </DesignSystemCard>
  );
};

export default FramerMotionPropagation;
