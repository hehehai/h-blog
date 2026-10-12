"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ClipboardAnimationDetails = () => {
  const clipboardIconVariants = {
    clicked: { opacity: 0 },
    unclicked: { opacity: 1 },
  };

  const checkmarkIconVariants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 },
  };

  const [duration, setDuration] = React.useState(0.4);
  const [isClicked, setIsClicked] = React.useState(false);

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.5], [0, 1]);

  const [opacityVal, setOpacityVal] = React.useState(opacity.get());
  const [pathLengthVal, setPathLengthVal] = React.useState(pathLength.get());

  React.useEffect(() => {
    if (!isClicked) {
      return;
    }
    const timer = window.setTimeout(() => setIsClicked(false), duration * 3000);
    return () => window.clearTimeout(timer);
  }, [duration, isClicked]);

  useMotionValueEvent(opacity, "change", (latest: number) => {
    setOpacityVal(Number.parseFloat(latest.toFixed(5)));
  });

  useMotionValueEvent(pathLength, "change", (latest: number) => {
    setPathLengthVal(Number.parseFloat(latest.toFixed(5)));
  });

  return (
    <Card className="items-center justify-between px-5 py-10 md:flex">
      <div className="flex flex-grow flex-col items-center md:w-3/5">
        <button
          aria-label="Copy to clipboard"
          disabled={isClicked}
          onClick={() => {
            setIsClicked(true);
          }}
          style={{
            background: "transparent",
            border: "none",
            cursor: isClicked ? "default" : "pointer",
            marginBottom: "20px",
            outline: "none",
          }}
          title="Copy to clipboard"
          type="button"
        >
          <svg
            fill="none"
            height="100"
            viewBox="0 0 25 25"
            width="100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Copy to clipboard</title>
            <motion.path
              animate={isClicked ? "clicked" : "unclicked"}
              d="M20.8511 9.46338H11.8511C10.7465 9.46338 9.85107 10.3588 9.85107 11.4634V20.4634C9.85107 21.5679 10.7465 22.4634 11.8511 22.4634H20.8511C21.9556 22.4634 22.8511 21.5679 22.8511 20.4634V11.4634C22.8511 10.3588 21.9556 9.46338 20.8511 9.46338Z"
              initial={false}
              stroke="#949699"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              transition={{ duration }}
              variants={clipboardIconVariants}
            />
            <motion.path
              animate={isClicked ? "clicked" : "unclicked"}
              d="M5.85107 15.4634H4.85107C4.32064 15.4634 3.81193 15.2527 3.43686 14.8776C3.06179 14.5025 2.85107 13.9938 2.85107 13.4634V4.46338C2.85107 3.93295 3.06179 3.42424 3.43686 3.04917C3.81193 2.67409 4.32064 2.46338 4.85107 2.46338H13.8511C14.3815 2.46338 14.8902 2.67409 15.2653 3.04917C15.6404 3.42424 15.8511 3.93295 15.8511 4.46338V5.46338"
              initial={false}
              stroke="#949699"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              transition={{ duration }}
              variants={clipboardIconVariants}
            />
            <motion.path
              animate={isClicked ? "clicked" : "unclicked"}
              d="M20 6L9 17L4 12"
              initial={false}
              stroke="#5184f9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              style={{ opacity, pathLength }}
              transition={{ duration }}
              variants={checkmarkIconVariants}
            />
          </svg>
        </button>
        <div className="flex items-center justify-center space-x-10">
          <div>
            PathLength: <Badge>{pathLengthVal}</Badge>
          </div>
          <div>
            Opacity: <Badge>{opacityVal}</Badge>
          </div>
        </div>
      </div>
      <form className="max-md:mt-5 md:w-2/5">
        <div className="space-y-8">
          <Label htmlFor="duration">
            Duration: <Badge>{duration}</Badge>
          </Label>
          <Slider
            id="duration"
            max={5.0}
            min={0.1}
            onValueChange={([val]) => setDuration(val)}
            step={0.1}
            value={[duration]}
          />
        </div>
      </form>
    </Card>
  );
};

export default ClipboardAnimationDetails;
