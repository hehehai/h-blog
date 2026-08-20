"use client";

import { motion } from "motion/react";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useDebouncedValue } from "@/components/lib/tainwild";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Label as UIComponentLabel } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  AnimationCardContent,
  Form,
  TransitionGridWrapper,
  Wrapper,
} from "../common-styled";

const TWEEN_EASINGS = [
  "linear",
  "easeIn",
  "easeOut",
  "easeInOut",
  "circIn",
  "circOut",
  "circInOut",
  "backIn",
  "backOut",
  "backInOut",
] as const;

type TweenEasing = (typeof TWEEN_EASINGS)[number];

const AnimationTypes = () => {
  const [ref, inView] = useInView();
  const [tweenAnimation, setTweenAnimation] =
    React.useState<TweenEasing>("easeInOut");
  const [mass, setMass] = React.useState(3);
  const [damping, setDamping] = React.useState(1);
  const [velocity, setVelocity] = React.useState(50);
  const [stiffness, setStiffness] = React.useState(100);
  const [countSpring, setCountSpring] = React.useState(0);
  const [countInertia, setCountInertia] = React.useState(0);

  const debouncedMass = useDebouncedValue(mass, 300);
  const debouncedStiffness = useDebouncedValue(stiffness, 300);
  const debouncedDamping = useDebouncedValue(damping, 300);
  const debouncedVelocity = useDebouncedValue(velocity, 300);

  React.useEffect(() => {
    setCountSpring(countSpring + 1);
  }, [debouncedMass, debouncedStiffness, debouncedDamping]);

  React.useEffect(() => {
    setCountInertia(countInertia + 1);
  }, [debouncedVelocity]);

  const springCodeString = `<motion.div
  ...
  transition={{
    type: 'spring',
    stiffness: ${stiffness},
    mass: ${mass},
    damping: ${damping},
  }}
/>`;

  const tweenCodeString = `<motion.div
  ...
  transition={{
    type: 'tween',
    ease: '${tweenAnimation}',
    duration: 2,
    ...
  }}
/>`;

  const inertiaCodeString = `<motion.div
  ...
  transition={{
    type: 'inertia',
    velocity: ${velocity},
  }}
/>`;

  return (
    <Wrapper ref={ref}>
      <TransitionGridWrapper>
        <Card className="flex flex-col">
          <CardHeader>Spring</CardHeader>
          <AnimationCardContent>
            <Form className="space-y-6">
              <div className="space-y-3">
                <UIComponentLabel htmlFor="mass">
                  Mass: <Badge>{mass}</Badge>
                </UIComponentLabel>
                <Slider
                  id="mass"
                  max={10}
                  min={1}
                  onValueChange={([val]) => setMass(val)}
                  value={[mass]}
                />
              </div>
              <div className="space-y-3">
                <UIComponentLabel htmlFor="stiffness">
                  Stiffness: <Badge>{stiffness}</Badge>
                </UIComponentLabel>
                <Slider
                  id="stiffness"
                  max={500}
                  min={1}
                  onValueChange={([val]) => setStiffness(val)}
                  value={[stiffness]}
                />
              </div>
              <div className="space-y-3">
                <UIComponentLabel htmlFor="damping">
                  Damping: <Badge>{damping}</Badge>
                </UIComponentLabel>
                <Slider
                  max={5}
                  min={0}
                  onValueChange={([val]) => setDamping(val)}
                  step={0.1}
                  value={[damping]}
                />
              </div>
            </Form>
            <div />
            <div className="py-10">
              <motion.div
                animate={
                  inView
                    ? {
                        y: 0,
                      }
                    : {
                        y: -100,
                      }
                }
                initial={{
                  y: -100,
                }}
                key={countSpring}
                style={{
                  background: "linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)",
                  borderRadius: "10px",
                  height: "100px",
                  width: "100px",
                }}
                transition={{
                  damping,
                  mass,
                  stiffness,
                  type: "spring",
                }}
              />
            </div>
          </AnimationCardContent>
          <pre className="m-0 block rounded-xl">
            <code>{springCodeString}</code>
          </pre>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>Tween</CardHeader>
          <AnimationCardContent>
            <Form>
              <div className="space-y-3">
                <UIComponentLabel htmlFor="tweenAnimation">
                  Ease: <Badge>{tweenAnimation}</Badge>
                </UIComponentLabel>
                <Select
                  onValueChange={(value) =>
                    setTweenAnimation(value as TweenEasing)
                  }
                  value={tweenAnimation}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ease" />
                  </SelectTrigger>
                  <SelectContent>
                    {TWEEN_EASINGS.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Form>
            <div />
            <div className="mt-5 flex flex-grow items-center justify-center">
              <motion.div
                animate={
                  inView
                    ? {
                        y: 20,
                      }
                    : {
                        y: -120,
                      }
                }
                initial={{
                  y: -120,
                }}
                key={tweenAnimation}
                style={{
                  background: "linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)",
                  borderRadius: "10px",
                  height: "100px",
                  width: "100px",
                }}
                transition={{
                  duration: 2,
                  ease: tweenAnimation,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                  repeatType: "reverse",
                }}
              />
            </div>
          </AnimationCardContent>
          <pre className="m-0 block rounded-xl">
            <code>{tweenCodeString}</code>
          </pre>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>Inertia</CardHeader>
          <AnimationCardContent>
            <Form>
              <div className="space-y-3">
                <UIComponentLabel htmlFor="velocity">
                  Velocity: <Badge>{velocity}</Badge>
                </UIComponentLabel>
                <Slider
                  max={500}
                  min={1}
                  onValueChange={([val]) => setVelocity(val)}
                  step={0.1}
                  value={[velocity]}
                />
              </div>
            </Form>
            <div />
            <div className="mt-5 flex flex-grow items-center justify-center">
              <motion.div
                animate={
                  inView
                    ? {
                        y: 20,
                      }
                    : {
                        y: -120,
                      }
                }
                initial={{
                  y: -120,
                }}
                key={countInertia}
                style={{
                  background: "linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)",
                  borderRadius: "10px",
                  height: "100px",
                  width: "100px",
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  type: "inertia",
                  velocity,
                }}
              />
            </div>
          </AnimationCardContent>
          <pre className="m-0 block rounded-xl">
            <code>{inertiaCodeString}</code>
          </pre>
        </Card>
      </TransitionGridWrapper>
    </Wrapper>
  );
};

export default AnimationTypes;
