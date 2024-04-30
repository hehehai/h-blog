import { Card } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Box } from "@maximeheckel/design-system";
import { motion } from "framer-motion";
import React from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

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
        <Box
          css={{
            display: "grid",
            width: "100%",
          }}
        >
          <Box
            as={motion.div}
            // @ts-ignore
            key={layout}
            layout={layout}
            css={{
              width: "100px",
              height: "100px",
              background:
                "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
              borderRadius: "12px",
              justifySelf: position,
            }}
          />
        </Box>
        <div className="mt-5 flex flex-col items-center">
          <RadioGroup
            value={position}
            onValueChange={setPosition}
            className="flex items-center space-x-3 mb-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="start" id="start" />
              <Label htmlFor="start">Start</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="center" />
              <Label htmlFor="center">Center</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="end" id="end" />
              <Label htmlFor="end">End</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center space-x-2">
            <Switch
              checked={layout}
              aria-label="Use layout animation"
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
