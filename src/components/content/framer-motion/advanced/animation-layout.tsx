'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { styled } from '@maximeheckel/design-system';
import { motion } from 'motion/react';
import React from 'react';
import { AnimationCardContent } from '../common-styled';

const PETS = [
  {
    id: '1',
    photo: '🐶',
  },
  {
    id: '2',
    photo: '🐱',
  },
  {
    id: '3',
    photo: '🐰',
  },
  {
    id: '4',
    photo: '🐭',
  },
  {
    id: '5',
    photo: '🐹',
  },
  {
    id: '6',
    photo: '🐷',
  },
  {
    id: '7',
    photo: '🐻',
  },
  {
    id: '8',
    photo: '🦁',
  },
  {
    id: '9',
    photo: '🦊',
  },
  {
    id: '10',
    photo: '🐧',
  },
  {
    id: '11',
    photo: '🐼',
  },
  {
    id: '12',
    photo: '🐮',
  },
];

const Circle = styled('div', {
  background: 'linear-gradient(104.01deg, #9bebeb 5.51%, #0fa6e9 98.93%)',
  width: '48px',
  height: '48px',
  userSelect: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  margin: '0 auto',
});

const FramerMotionAnimationLayout = () => {
  const [selectedPetID, setSelectedPetID] = React.useState('1');
  const [withLayoutID, setWithLayoutID] = React.useState(false);

  return (
    <Card className="py-6">
      <AnimationCardContent>
        <div className="grid grid-cols-4 gap-3 py-10">
          {PETS.map((pet) => (
            <div
              style={{
                listStyle: 'none',
                position: 'relative',
                cursor: 'pointer',
              }}
              key={pet.id}
              onClick={() => setSelectedPetID(pet.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedPetID(pet.id);
                }
              }}
            >
              <Circle>{pet.photo}</Circle>
              {selectedPetID === pet.id && (
                <motion.div
                  layoutId={withLayoutID ? 'border' : undefined}
                  style={{
                    position: 'absolute',
                    top: '0',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    border: '4px solid #2E72FC',
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-3">
          <Checkbox
            checked={withLayoutID}
            id="layout"
            onCheckedChange={() => setWithLayoutID((prev) => !prev)}
          />
          <Label
            htmlFor="layout"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            使用公用布局ID
          </Label>
        </div>
      </AnimationCardContent>
    </Card>
  );
};

export default FramerMotionAnimationLayout;
