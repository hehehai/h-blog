"use client";

import React from "react";
import { TainwildBox } from "@/components/lib/tainwild";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const Basic = () => {
  const [position, setPosition] = React.useState("start");
  const [layout, setLayout] = React.useState(false);

  const codeString = layout
    ? `// position: ${position}

<motion.div
  layout
  style={{
    justifySelf: position,
  }}
  //...
/>`
    : `// position: ${position}

<motion.div
  style={{
    justifySelf: position,
  }}
  //...
/>
`;

  return (
    <Card>
      <div className="p-4">
        <TainwildBox
          css={{
            display: "grid",
            width: "100%",
          }}
        >
          <TainwildBox
            css={{
              background:
                "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
              borderRadius: "12px",
              height: "100px",
              justifySelf: position,
              width: "100px",
            }}
            key={String(layout)}
            layout={layout}
          />
        </TainwildBox>
        <div className="mt-5 flex flex-col items-center">
          <RadioGroup
            className="mb-3 flex items-center space-x-3"
            onValueChange={setPosition}
            value={position}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="start" value="start" />
              <Label htmlFor="start">Start</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="center" value="center" />
              <Label htmlFor="center">Center</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="end" value="end" />
              <Label htmlFor="end">End</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center space-x-2">
            <Switch
              aria-label="Use layout animation"
              checked={layout}
              id="use-layout"
              onCheckedChange={() => setLayout((prev) => !prev)}
            />
            <Label htmlFor="use-layout">使用布局动画</Label>
          </div>
        </div>
      </div>
      <pre className="m-0 block rounded-xl">
        <code>{codeString}</code>
      </pre>
    </Card>
  );
};

export default Basic;
