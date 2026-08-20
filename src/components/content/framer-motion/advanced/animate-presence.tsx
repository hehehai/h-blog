"use client";

import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { TainwildFlex as Flex, Icon, styled } from "@/components/lib/tainwild";
import { Button } from "@/components/ui/button";
import {
  Card as DesignSystemCard,
  CardHeader as DesignSystemCardHeader,
} from "@/components/ui/card";
import { AnimationCardContent, TransitionGridWrapper } from "../common-styled";

const CardWrapper = styled("div", {
  height: "300px",
  position: "relative",
});

const ITEMS = ["🚀", "🎉", "🎊"];

interface Props {
  withAnimatePresence?: boolean;
}

const ContentDemo = (props: Props) => {
  const { withAnimatePresence } = props;
  const [selected, setSelected] = React.useState(0);
  const [buttonAboutToBeClicked, setAboutToBeClicked] = React.useState("next");

  const next = () => {
    if (selected === ITEMS.length - 1) {
      setSelected(0);
    } else {
      setSelected((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (selected === 0) {
      setSelected(ITEMS.length - 1);
    } else {
      setSelected((prev) => prev - 1);
    }
  };

  const cardVariants = {
    animate: {
      transition: {
        duration: 0.4,
        //delay: 0.2,
      },
      x: -125,
    },
    exit: (next: boolean) => ({
      transition: {
        duration: 0.4,
      },
      x: next ? 500 : -500,
    }),
    initial: (next: boolean) => ({
      x: next ? -500 : 500,
    }),
  };

  const WrapperComponent = withAnimatePresence
    ? AnimatePresence
    : (props: { children: React.ReactNode }) => <div {...props} />;

  return (
    <>
      <CardWrapper>
        {ITEMS.map((item, index) => (
          <WrapperComponent key={`foo-${String(index)}`}>
            {index === selected ? (
              <motion.div
                animate="animate"
                className="absolute mb-0 flex h-[300px] w-[250px] flex-col items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-tr from-[#9bebeb] to-[#0fa6e9] text-[64px] transition-transform duration-[800ms] ease-[0s]"
                custom={buttonAboutToBeClicked === "next"}
                exit="exit"
                initial="initial"
                variants={cardVariants}
                whileHover={{ transform: "perspective(2000px) rotateY(2deg)" }}
              >
                <div>{item}</div>
              </motion.div>
            ) : null}
          </WrapperComponent>
        ))}
      </CardWrapper>
      <Flex className="mt-10 mb-4 space-x-5" gap={4}>
        <Button
          aria-label="Previous"
          id="prev"
          onClick={prev}
          onMouseEnter={() => setAboutToBeClicked("prev")}
          size="icon"
          variant={"outline"}
        >
          <Icon.Arrow style={{ transform: "scaleX(-1)" }} />
        </Button>

        <Button
          aria-label="Next"
          id="next"
          onClick={next}
          onMouseEnter={() => setAboutToBeClicked("next")}
          size="icon"
          variant={"outline"}
        >
          <Icon.Arrow />
        </Button>
      </Flex>
    </>
  );
};

const FramerMotionAnimatePresence = () => (
  <TransitionGridWrapper>
    <DesignSystemCard className="overflow-hidden">
      <DesignSystemCardHeader className="mb-10">
        不使用 AnimatePresence
      </DesignSystemCardHeader>
      <AnimationCardContent>
        <ContentDemo />
      </AnimationCardContent>
    </DesignSystemCard>
    <DesignSystemCard className="overflow-hidden">
      <DesignSystemCardHeader className="mb-10">
        使用 AnimatePresence
      </DesignSystemCardHeader>
      <AnimationCardContent>
        <ContentDemo withAnimatePresence />
      </AnimationCardContent>
    </DesignSystemCard>
  </TransitionGridWrapper>
);

export default FramerMotionAnimatePresence;
