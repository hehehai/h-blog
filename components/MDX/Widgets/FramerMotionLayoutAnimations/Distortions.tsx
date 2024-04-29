import { Card } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

import { Box } from "@maximeheckel/design-system";
import { motion } from "framer-motion";
import React from "react";

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
        <div className="flex justify-center min-h-[180px]">
          <Box
            as={motion.div}
            // @ts-ignore
            key={inline}
            layout
            transition={{
              layout: {
                duration: 1.5,
              },
            }}
            css={{
              justifySelf: "center",
              alignSelf: "center",
              background:
                "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
              width: expanded ? "150px" : "20px",
              height: expanded ? "150px" : "20px",
              borderRadius: "16px",
            }}
            style={
              inline
                ? {
                    borderRadius: "16px",
                  }
                : {}
            }
          />
        </div>
        <div className="mt-10 flex items-center justify-center space-x-3 mb-2">
          <div className="flex items-center space-x-2">
            <Switch
              checked={expanded}
              aria-label="Expand card"
              id="expand-card-distort"
              onCheckedChange={() => setExpanded((prev) => !prev)}
            />
            <Label htmlFor="expand-card-distort">扩展卡片</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={inline}
              aria-label="Expand card"
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
