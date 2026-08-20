"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import React from "react";
import { css, Icon } from "@/components/lib/tainwild";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ITEMS = [
  {
    id: 1,
    text: "Make some coffee ☕️",
  },
  {
    id: 2,
    text: "Drink water 💧",
  },
  {
    id: 3,
    text: "Go to the gym 🏃‍♂️",
  },
];

const ITEMS2 = [
  {
    id: 1,
    text: "Finish blog post ✍️",
  },
  {
    id: 2,
    text: "Build new Three.js experiences ✨",
  },
  {
    id: 3,
    text: "Add new components to Design System 🌈",
  },
];

const List = (props: {
  items: Array<{ text: string; id: number }>;
  name: string;
}) => {
  const { items, name } = props;
  const [listItems, setListItems] = React.useState(items);

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {listItems.map((item) => (
          <motion.div
            className="w-full rounded-lg border bg-background px-3 py-1"
            exit={{
              opacity: 0,
            }}
            initial={{
              opacity: 1,
            }}
            key={item.id}
            layout
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setListItems((prev) =>
                    prev.filter((task) => task.id !== item.id)
                  )
                }
                style={css({
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                })}
                type="button"
              >
                <Icon.X size="4" />
              </button>
              <div>
                {item.text} <Badge className="ml-1">{name}</Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ListLayoutGroup = () => {
  const [layoutGroup, setLayoutGroup] = React.useState(false);

  const codeString = layoutGroup
    ? `<LayoutGroup>
  <List
    items={[...]}
    name="List 1"
  />
  <List
    items={[...]}
    name="List 2"
  />
</LayoutGroup>`
    : `<>
  <List
    items={[...]}
    name="List 1"
  />
  <List
    items={[...]}
    name="List 2"
  />
</>`;

  return (
    <Card>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center space-x-2">
          <Switch
            aria-label="包裹 LayoutGroup"
            checked={layoutGroup}
            id="use-layoutGroup"
            onCheckedChange={() => setLayoutGroup((prev) => !prev)}
          />
          <Label htmlFor="use-layoutGroup">包裹 LayoutGroup</Label>
        </div>
        {layoutGroup ? (
          <LayoutGroup>
            <List items={ITEMS} name="List 1" />
            <List items={ITEMS2} name="List 2" />
          </LayoutGroup>
        ) : (
          <>
            <List items={ITEMS} name="List 1" />
            <List items={ITEMS2} name="List 2" />
          </>
        )}
      </div>
      <pre className="m-0 block rounded-xl">
        <code>{codeString}</code>
      </pre>
    </Card>
  );
};

export default ListLayoutGroup;
