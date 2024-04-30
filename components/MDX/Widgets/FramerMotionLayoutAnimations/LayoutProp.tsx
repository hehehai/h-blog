import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Box } from "@maximeheckel/design-system";
import { motion } from "framer-motion";
import React from "react";

const LayoutProp = () => {
  const [expanded, setExpanded] = React.useState(true);

  // layout false => no transition / new size + new position
  // layout true => size + position
  // layout position => just the position / new size instantly
  // layout size => just the size / moves to position instantly

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>{`layout={true}`}</CardHeader>
          <CardContent className="h-[200px] grid overflow-hidden">
            <Box
              as={motion.div}
              layout
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
              css={{
                justifySelf: expanded ? "center" : "flex-start",
                alignSelf: expanded ? "center" : "flex-start",
                background:
                  "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
                width: expanded ? "20px" : "100%",
                height: expanded ? "20px" : "100%",
              }}
              style={{
                borderRadius: 20,
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>{`layout="position"`}</CardHeader>
          <CardContent className="h-[200px] grid overflow-hidden">
            <Box
              as={motion.div}
              layout="position"
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
              css={{
                justifySelf: expanded ? "center" : "flex-start",
                alignSelf: expanded ? "center" : "flex-start",
                background:
                  "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
                width: expanded ? "20px" : "100%",
                height: expanded ? "20px" : "100%",
              }}
              style={{
                borderRadius: 20,
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>{`layout="size"`}</CardHeader>
          <CardContent className="h-[200px] grid overflow-hidden">
            <Box
              as={motion.div}
              layout="size"
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
              css={{
                justifySelf: expanded ? "center" : "flex-start",
                alignSelf: expanded ? "center" : "flex-start",
                background:
                  "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
                width: expanded ? "20px" : "100%",
                height: expanded ? "20px" : "100%",
              }}
              style={{
                borderRadius: 20,
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <Switch
          checked={expanded}
          aria-label="扩展卡片"
          id="expand-card"
          onCheckedChange={() => setExpanded((prev) => !prev)}
        />
        <Label htmlFor="expand-card">扩展卡片</Label>
      </div>
    </div>
  );
};
export default LayoutProp;
