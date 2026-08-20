"use client";

import { Layers } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import {
  TainwildFlex as Flex,
  styled,
  TainwildText,
} from "@/components/lib/tainwild";
import { Button } from "@/components/ui/button";
import { Card as DesignSystemCard } from "@/components/ui/card";
import { AnimationCardContent } from "../common-styled";

const CardWrapper = styled("div", {
  height: "200px",
  position: "relative",
  width: "300px",
});

const Wrapper = styled(motion.div, {
  cursor: "default",
  position: "relative",
});

const CaptureLayer = styled(motion.div, {
  background:
    "repeating-linear-gradient(-45deg, #15181e, #15181e 5px, rgba(92, 135, 246, 0.07) 5px, rgba(92, 135, 246, 0.07) 10px)",
  borderRadius: "32px",
  boxShadow: `1px 1px 0 1px #16181D,
    -1px 0 28px 0 rgb(34 33 81 / 1%), 28px 28px 28px 0 rgb(34 33 81 / 25%)`,
  height: "300px",
  opacity: 0.6,
  position: "absolute",
  transformStyle: "preserve-3d",
  transition: "0.4s ease-in-out box-shadow, 0.4s ease-in-out opacity",
  width: "300px",

  zIndex: "3",
});

const captureLayerVariants = {
  show: {
    false: {
      opacity: 0,
    },
    true: {
      opacity: 1,
    },
  },
};

const Glow = styled(motion.div, {
  background:
    "linear-gradient(104.01deg, rgb(155, 235, 235) 5.51%, rgb(15, 166, 233) 98.93%)",
  borderRadius: "32px",
  filter: "blur(15px)",
  height: "100%",
  left: "0",
  position: "absolute",
  top: "0",
  width: "100%",
});

const Card = styled("div", {
  background: "rgba(31, 36, 45, 0.5)",
  border: "1px solid rgba(92, 135, 246, 0.7)",
  borderRadius: "32px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  marginBottom: "0px",
  overflow: "hidden",
  position: "relative",
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

  const layerVariants = {
    active: (inPerspective: boolean) => ({
      rotateX: inPerspective ? 51 : 0,
      rotateY: 0,
      rotateZ: inPerspective ? 43 : 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
    initial: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const [inPerspective, setInPerspective] = React.useState(false);

  return (
    <Flex
      align="center"
      css={{
        position: "relative",
        textAlign: "center",
      }}
      direction="column"
    >
      <Wrapper
        animate="active"
        custom={inPerspective}
        initial="initial"
        variants={layerVariants}
        whileHover="hover"
        whileTap="hover"
      >
        <CaptureLayer
          show={inPerspective}
          variants={captureLayerVariants}
          whileHover={{
            boxShadow: `1px 1px 0 1px #16181D,
              -1px 0 28px 0 rgba(34, 33, 81, 0.01),
              54px 54px 28px -10px rgba(34, 33, 81, 0.15)`,
          }}
        />
        <TainwildText as="h3" size="xl" weight="bold">
          Hover me!
        </TainwildText>
        <br />
        <br />
        <CardWrapper>
          <Glow custom={inPerspective} variants={glowVariants} />
          <Card>
            <div>✨ It&apos;s magic! ✨</div>
          </Card>
        </CardWrapper>
        {inPerspective ? (
          <motion.div
            style={{
              fontSize: "12px",
              maxWidth: "250px",
              position: "absolute",
              top: "-55px",
            }}
            variants={tagVariants}
          >
            {`顶层： 动画组件包装器在悬停时设置变量"hover"`}
          </motion.div>
        ) : null}
        {inPerspective ? (
          <motion.div
            style={{
              bottom: "-75px",
              fontSize: "12px",
              maxWidth: "250px",
              position: "absolute",
              right: "-15px",
            }}
            variants={tagVariants}
          >
            {`底层： "Glow" 动画组件使用悬停变量`}
          </motion.div>
        ) : null}
      </Wrapper>
      <Button
        className="mt-10"
        onClick={() => setInPerspective((prev) => !prev)}
        size="icon"
        title={inPerspective ? "Disable perspective" : "Enable perspective"}
        variant="outline"
      >
        <Layers />
      </Button>
    </Flex>
  );
};

const FramerMotionPropagation = () => (
  <DesignSystemCard className="py-10">
    <AnimationCardContent>
      <CardWithGlow />
    </AnimationCardContent>
  </DesignSystemCard>
);

export default FramerMotionPropagation;
