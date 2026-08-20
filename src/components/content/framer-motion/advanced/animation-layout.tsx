"use client";

import { motion } from "motion/react";
import React from "react";
import { styled } from "@/components/lib/tainwild";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AnimationCardContent } from "../common-styled";

const PETS = [
  {
    id: "1",
    photo: "🐶",
  },
  {
    id: "2",
    photo: "🐱",
  },
  {
    id: "3",
    photo: "🐰",
  },
  {
    id: "4",
    photo: "🐭",
  },
  {
    id: "5",
    photo: "🐹",
  },
  {
    id: "6",
    photo: "🐷",
  },
  {
    id: "7",
    photo: "🐻",
  },
  {
    id: "8",
    photo: "🦁",
  },
  {
    id: "9",
    photo: "🦊",
  },
  {
    id: "10",
    photo: "🐧",
  },
  {
    id: "11",
    photo: "🐼",
  },
  {
    id: "12",
    photo: "🐮",
  },
];

const Circle = styled("div", {
  alignItems: "center",
  background: "linear-gradient(104.01deg, #9bebeb 5.51%, #0fa6e9 98.93%)",
  borderRadius: "50%",
  display: "flex",
  fontSize: "32px",
  height: "48px",
  justifyContent: "center",
  margin: "0 auto",
  userSelect: "none",
  width: "48px",
});

const FramerMotionAnimationLayout = () => {
  const [selectedPetID, setSelectedPetID] = React.useState("1");
  const [withLayoutID, setWithLayoutID] = React.useState(false);

  return (
    <Card className="py-6">
      <AnimationCardContent>
        <div className="grid grid-cols-4 gap-3 py-10">
          {PETS.map((pet) => (
            <button
              aria-label={`选择${pet.photo}`}
              aria-pressed={selectedPetID === pet.id}
              className="border-0 bg-transparent p-0"
              key={pet.id}
              onClick={() => setSelectedPetID(pet.id)}
              style={{
                cursor: "pointer",
                listStyle: "none",
                position: "relative",
              }}
              type="button"
            >
              <Circle>{pet.photo}</Circle>
              {selectedPetID === pet.id && (
                <motion.div
                  layoutId={withLayoutID ? "border" : undefined}
                  style={{
                    border: "4px solid #2E72FC",
                    borderRadius: "50%",
                    height: "48px",
                    position: "absolute",
                    top: "0",
                    width: "48px",
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-3">
          <Checkbox
            checked={withLayoutID}
            id="layout"
            onCheckedChange={() => setWithLayoutID((prev) => !prev)}
          />
          <Label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="layout"
          >
            使用公用布局ID
          </Label>
        </div>
      </AnimationCardContent>
    </Card>
  );
};

export default FramerMotionAnimationLayout;
