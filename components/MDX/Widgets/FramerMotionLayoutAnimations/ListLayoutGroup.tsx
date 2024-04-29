import { Card } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

import { css, Icon } from "@maximeheckel/design-system";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React from "react";
import { Badge } from "~/components/ui/badge";

const ITEMS = [
  {
    text: "Make some coffee ☕️",
    id: 1,
  },
  {
    text: "Drink water 💧",
    id: 2,
  },
  {
    text: "Go to the gym 🏃‍♂️",
    id: 3,
  },
];

const ITEMS2 = [
  {
    text: "Finish blog post ✍️",
    id: 1,
  },
  {
    text: "Build new Three.js experiences ✨",
    id: 2,
  },
  {
    text: "Add new components to Design System 🌈",
    id: 3,
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
            layout
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            key={item.id}
            className="w-full border rounded-lg px-3 py-1 bg-background"
          >
            <div className="flex items-center space-x-3">
              <button
                className={css({
                  background: "transparent",
                  boxShadow: "none",
                  border: "none",
                  cursor: "pointer",
                })()}
                onClick={() =>
                  setListItems((prev) =>
                    prev.filter((task) => task.id !== item.id)
                  )
                }
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
            checked={layoutGroup}
            aria-label="包裹 LayoutGroup"
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
