"use client";

import { motion } from "motion/react";
import React from "react";
import { TainwildBox as Box } from "@/components/lib/tainwild";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const LayoutProp = () => {
  const [expanded, setExpanded] = React.useState(true);

  // layout false => no transition / new size + new position
  // layout true => size + position
  // layout position => just the position / new size instantly
  // layout size => just the size / moves to position instantly

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader>{"layout={true}"}</CardHeader>
          <CardContent className="grid h-[200px] overflow-hidden">
            <Box
              as={motion.div}
              css={{
                alignSelf: expanded ? "center" : "flex-start",
                background:
                  "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
                height: expanded ? "20px" : "100%",
                justifySelf: expanded ? "center" : "flex-start",
                width: expanded ? "20px" : "100%",
              }}
              layout
              style={{
                borderRadius: 20,
              }}
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>{`layout="position"`}</CardHeader>
          <CardContent className="grid h-[200px] overflow-hidden">
            <Box
              as={motion.div}
              css={{
                alignSelf: expanded ? "center" : "flex-start",
                background:
                  "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
                height: expanded ? "20px" : "100%",
                justifySelf: expanded ? "center" : "flex-start",
                width: expanded ? "20px" : "100%",
              }}
              layout="position"
              style={{
                borderRadius: 20,
              }}
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>{`layout="size"`}</CardHeader>
          <CardContent className="grid h-[200px] overflow-hidden">
            <Box
              as={motion.div}
              css={{
                alignSelf: expanded ? "center" : "flex-start",
                background:
                  "linear-gradient(-60deg,#2E83FF -10%,#EB7D9F 50%, #FFCBBE 100%)",
                height: expanded ? "20px" : "100%",
                justifySelf: expanded ? "center" : "flex-start",
                width: expanded ? "20px" : "100%",
              }}
              layout="size"
              style={{
                borderRadius: 20,
              }}
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-2">
        <Switch
          aria-label="扩展卡片"
          checked={expanded}
          id="expand-card"
          onCheckedChange={() => setExpanded((prev) => !prev)}
        />
        <Label htmlFor="expand-card">扩展卡片</Label>
      </div>
    </div>
  );
};
export default LayoutProp;
