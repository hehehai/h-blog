"use client";

import { motion } from "motion/react";
import React from "react";
import { TainwildBox as Box } from "@/components/lib/tainwild";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Distortions = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [inline, setInline] = React.useState(false);
  const codeString = inline
    ? `// expanded: ${expanded}

// CSS
.box {
  width: 20px;
  height: 20px;
}

.box[data-expanded="true"] {
  width: 150px;
  height: 150px;
}

// JS
<motion.div
  layout
  className="box"
  data-expanded={expanded}
  style={{
    borderRadius: '20px'
  }}
/>`
    : `// expanded: ${expanded}

// CSS
.box {
  width: 20px;
  height: 20px;
  border-radius: 20px;
}

.box[data-expanded="true"] {
  width: 150px;
  height: 150px;
}

// JS
<motion.div
  layout
  className="box"
  data-expanded={expanded}
/>

`;

  return (
    <Card>
      <div className="p-4">
        <div className="flex min-h-[180px] justify-center">
          <Box
            as={motion.div}
            css={{
              alignSelf: "center",
              background:
                "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
              borderRadius: "16px",
              height: expanded ? "150px" : "20px",
              justifySelf: "center",
              width: expanded ? "150px" : "20px",
            }}
            key={String(inline)}
            layout
            style={
              inline
                ? {
                    borderRadius: "16px",
                  }
                : {}
            }
            transition={{
              layout: {
                duration: 1.5,
              },
            }}
          />
        </div>
        <div className="mt-10 mb-2 flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <Switch
              aria-label="Expand card"
              checked={expanded}
              id="expand-card-distort"
              onCheckedChange={() => setExpanded((prev) => !prev)}
            />
            <Label htmlFor="expand-card-distort">扩展卡片</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              aria-label="Expand card"
              checked={inline}
              id="distort"
              onCheckedChange={() => setInline((prev) => !prev)}
            />
            <Label htmlFor="distort">设置内联扭曲属性</Label>
          </div>
        </div>
      </div>
      <pre className="m-0 block rounded-xl">
        <code>{codeString}</code>
      </pre>
    </Card>
  );
};

export default Distortions;
