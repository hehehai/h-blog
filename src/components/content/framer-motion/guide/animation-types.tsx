'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label, useDebouncedValue } from '@maximeheckel/design-system';
import { motion } from 'motion/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  AnimationCardContent,
  Form,
  TransitionGridWrapper,
  Wrapper,
} from '../common-styled';

const AnimationTypes = () => {
  const [ref, inView] = useInView();
  const [tweenAnimation, setTweenAnimation] = React.useState('easeInOut');
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    setCountSpring(countSpring + 1);
  }, [debouncedMass, debouncedStiffness, debouncedDamping]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
                <Label htmlFor="mass">
                  Mass: <Badge>{mass}</Badge>
                </Label>
                <Slider
                  id="mass"
                  value={[mass]}
                  max={10}
                  min={1}
                  onValueChange={([val]) => setMass(val)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="stiffness">
                  Stiffness: <Badge>{stiffness}</Badge>
                </Label>
                <Slider
                  id="stiffness"
                  value={[stiffness]}
                  max={500}
                  min={1}
                  onValueChange={([val]) => setStiffness(val)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="damping">
                  Damping: <Badge>{damping}</Badge>
                </Label>
                <Slider
                  value={[damping]}
                  max={5}
                  min={0}
                  step={0.1}
                  onValueChange={([val]) => setDamping(val)}
                />
              </div>
            </Form>
            <div />
            <div className="py-10">
              <motion.div
                key={countSpring}
                style={{
                  background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                  height: '100px',
                  width: '100px',
                  borderRadius: '10px',
                }}
                initial={{
                  y: -100,
                }}
                animate={
                  inView
                    ? {
                        y: 0,
                      }
                    : {
                        y: -100,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness,
                  mass,
                  damping,
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
                <Label htmlFor="tweenAnimation">
                  Ease: <Badge>{tweenAnimation}</Badge>
                </Label>
                <Select
                  value={tweenAnimation}
                  onValueChange={setTweenAnimation}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ease" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'linear',
                      'easeIn',
                      'easeOut',
                      'easeInOut',
                      'circIn',
                      'circOut',
                      'circInOut',
                      'backIn',
                      'backOut',
                      'backInOut',
                      'elasticIn',
                    ].map((value) => (
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
                key={tweenAnimation}
                style={{
                  background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                  height: '100px',
                  width: '100px',
                  borderRadius: '10px',
                }}
                initial={{
                  y: -120,
                }}
                animate={
                  inView
                    ? {
                        y: 20,
                      }
                    : {
                        y: -120,
                      }
                }
                transition={{
                  ease: tweenAnimation,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                  repeatDelay: 1,
                  duration: 2,
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
                <Label htmlFor="velocity">
                  Velocity: <Badge>{velocity}</Badge>
                </Label>
                <Slider
                  value={[velocity]}
                  max={500}
                  min={1}
                  step={0.1}
                  onValueChange={([val]) => setVelocity(val)}
                />
              </div>
            </Form>
            <div />
            <div className="mt-5 flex flex-grow items-center justify-center">
              <motion.div
                key={countInertia}
                style={{
                  background: 'linear-gradient(90deg,#ffa0ae 0%,#aacaef 75%)',
                  height: '100px',
                  width: '100px',
                  borderRadius: '10px',
                }}
                initial={{
                  y: -120,
                }}
                animate={
                  inView
                    ? {
                        y: 20,
                      }
                    : {
                        y: -120,
                      }
                }
                transition={{
                  type: 'inertia',
                  velocity,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
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
