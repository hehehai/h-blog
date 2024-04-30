import {
  Card as DesignSystemCard,
  CardHeader as DesignSystemCardHeader,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Flex, Icon, styled } from "@maximeheckel/design-system";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AnimationCardContent, TransitionGridWrapper } from "../Components";

const CardWrapper = styled("div", {
  height: "300px",
  position: "relative",
});

const Card = styled("div", {
  position: "absolute",
  borderRadius: "32px",
  marginBottom: "0px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(104.01deg, #9bebeb 5.51%, #0fa6e9 98.93%)",
  transform: "perspective(1000px) rotateY(15deg)",
  width: "250px",
  height: "300px",
  fontSize: "64px",
  transition: "transform 0.8s ease 0s",

  "&:hover": {
    transform: "perspective(2000px) rotateY(2deg)",
  },
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
    initial: (next: boolean) => ({
      x: next ? -500 : 500,
    }),
    animate: {
      x: -125,
      transition: {
        duration: 0.4,
        //delay: 0.2,
      },
    },
    exit: (next: boolean) => ({
      x: next ? 500 : -500,
      transition: {
        duration: 0.4,
      },
    }),
  };

  const WrapperComponent = withAnimatePresence
    ? AnimatePresence
    : (props: { children: React.ReactNode }) => <div {...props} />;

  return (
    <>
      <CardWrapper>
        {ITEMS.map((item, index) => {
          return (
            <WrapperComponent key={`foo-${index}`}>
              {index === selected ? (
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={cardVariants}
                  custom={buttonAboutToBeClicked === "next"}
                >
                  <Card>
                    <div>{item}</div>
                  </Card>
                </motion.div>
              ) : null}
            </WrapperComponent>
          );
        })}
      </CardWrapper>
      <Flex gap={4} className="mt-10 space-x-5 mb-4">
        <Button
          id="prev"
          aria-label="Previous"
          size="icon"
          variant={"outline"}
          onMouseEnter={() => setAboutToBeClicked("prev")}
          onClick={prev}
        >
          <Icon.Arrow style={{ transform: "scaleX(-1)" }} />
        </Button>

        <Button
          id="next"
          aria-label="Next"
          size="icon"
          variant={"outline"}
          onMouseEnter={() => setAboutToBeClicked("next")}
          onClick={next}
        >
          <Icon.Arrow />
        </Button>
      </Flex>
    </>
  );
};

const FramerMotionAnimatePresence = () => {
  return (
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
};

export default FramerMotionAnimatePresence;
