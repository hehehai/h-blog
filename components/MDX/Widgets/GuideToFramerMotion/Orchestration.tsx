import { useDebouncedValue } from "@maximeheckel/design-system";
import { motion } from "framer-motion";
import React from "react";
import { AnimationCardContent, Form, HighlightedValue } from "../Components";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Badge } from "~/components/ui/badge";

const Orchestration = () => {
  const [key, setKey] = React.useState(0);
  const [delayChildren, setDelayChildren] = React.useState(0.5);
  const [staggerChildren, setStaggerChildren] = React.useState(0.5);

  const debouncedDelay = useDebouncedValue(delayChildren, 500);
  const debouncedStagger = useDebouncedValue(staggerChildren, 500);

  const boxVariants = {
    out: {
      y: 600,
    },
    in: {
      y: 0,
      transition: {
        duration: "0.6",
        delayChildren,
        staggerChildren,
      },
    },
  };

  const iconVariants = {
    out: {
      x: -600,
    },
    in: {
      x: 0,
    },
  };

  React.useEffect(() => {
    setKey(key + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDelay, debouncedStagger]);

  return (
    <Card className="p-5">
      <AnimationCardContent
        css={{
          margin: "0 auto",
          maxWidth: "440px",
          height: "540px",
          paddingBottom: "32px",
        }}
      >
        <form className="w-full">
          <div className="space-y-3 mb-6">
            <Label htmlFor="delayChildren">
              Delay Children: <Badge>{delayChildren}</Badge>
            </Label>
            <Slider
              id="delayChildren"
              value={[delayChildren]}
              min={0}
              max={5}
              step={0.1}
              onValueChange={([val]) => setDelayChildren(val)}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="staggerChildren">
              Stagger Children: <Badge>{staggerChildren}</Badge>
            </Label>
            <Slider
              id="staggerChildren"
              value={[staggerChildren]}
              min={0}
              max={5}
              step={0.1}
              onValueChange={([val]) => setStaggerChildren(val)}
            />
          </div>
        </form>
        <motion.div
          key={key}
          style={{
            background: "linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)",
            height: "280px",
            width: "230px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            fontSize: "48px",
            overflow: "hidden",
          }}
          variants={boxVariants}
          initial="out"
          animate="in"
        >
          <motion.span
            role="img"
            aria-labelledby="magic wand"
            variants={iconVariants}
          >
            🚀
          </motion.span>
          <motion.span
            role="img"
            aria-labelledby="sparkles"
            variants={iconVariants}
          >
            ✨
          </motion.span>
          <motion.span
            role="img"
            aria-labelledby="party popper"
            variants={iconVariants}
          >
            🎉
          </motion.span>
        </motion.div>
      </AnimationCardContent>
    </Card>
  );
};

export default Orchestration;
