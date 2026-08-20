"use client";

import { motion } from "motion/react";
import React from "react";
import { useDebouncedValue } from "@/components/lib/tainwild";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AnimationCardContent } from "../common-styled";

const Orchestration = () => {
  const [key, setKey] = React.useState(0);
  const [delayChildren, setDelayChildren] = React.useState(0.5);
  const [staggerChildren, setStaggerChildren] = React.useState(0.5);

  const debouncedDelay = useDebouncedValue(delayChildren, 500);
  const debouncedStagger = useDebouncedValue(staggerChildren, 500);

  const boxVariants = {
    in: {
      transition: {
        delayChildren,
        duration: 0.6,
        staggerChildren,
      },
      y: 0,
    },
    out: {
      y: 600,
    },
  };

  const iconVariants = {
    in: {
      x: 0,
    },
    out: {
      x: -600,
    },
  };

  React.useEffect(() => {
    setKey(key + 1);
  }, [debouncedDelay, debouncedStagger]);

  return (
    <Card className="p-5">
      <AnimationCardContent
        css={{
          height: "540px",
          margin: "0 auto",
          maxWidth: "440px",
          paddingBottom: "32px",
        }}
      >
        <form className="w-full">
          <div className="mb-6 space-y-3">
            <Label htmlFor="delayChildren">
              Delay Children: <Badge>{delayChildren}</Badge>
            </Label>
            <Slider
              id="delayChildren"
              max={5}
              min={0}
              onValueChange={([val]) => setDelayChildren(val)}
              step={0.1}
              value={[delayChildren]}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="staggerChildren">
              Stagger Children: <Badge>{staggerChildren}</Badge>
            </Label>
            <Slider
              id="staggerChildren"
              max={5}
              min={0}
              onValueChange={([val]) => setStaggerChildren(val)}
              step={0.1}
              value={[staggerChildren]}
            />
          </div>
        </form>
        <motion.div
          animate="in"
          initial="out"
          key={key}
          style={{
            alignItems: "center",
            background: "linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            fontSize: "48px",
            height: "280px",
            justifyContent: "space-evenly",
            overflow: "hidden",
            width: "230px",
          }}
          variants={boxVariants}
        >
          <motion.span
            aria-labelledby="magic wand"
            role="img"
            variants={iconVariants}
          >
            🚀
          </motion.span>
          <motion.span
            aria-labelledby="sparkles"
            role="img"
            variants={iconVariants}
          >
            ✨
          </motion.span>
          <motion.span
            aria-labelledby="party popper"
            role="img"
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
