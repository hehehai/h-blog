import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";

import { css, Icon } from "@maximeheckel/design-system";
import { AnimatePresence, LayoutGroup, motion, Reorder } from "framer-motion";
import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const ITEMS = [
  {
    text: "Finish blog post ✍️",
    checked: false,
    id: 1,
  },
  {
    text: "Build new Three.js experiences ✨",
    checked: false,
    id: 2,
  },
  {
    text: "Add new components to Design System 🌈",
    checked: false,
    id: 3,
  },
  {
    text: "Make some coffee ☕️",
    checked: false,
    id: 4,
  },
  {
    text: "Drink water 💧",
    checked: false,
    id: 5,
  },
  {
    text: "Go to the gym 🏃‍♂️",
    checked: false,
    id: 6,
  },
];

const AdvanceReorderExample = () => {
  const [items, setItems] = React.useState(ITEMS);

  const completeItem = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          checked: !item.checked,
        };

        return updatedItem;
      }

      return item;
    });

    setItems(updatedItems);
  };

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex gap-2">
        <Button
          disabled={items.length > 5}
          onClick={() =>
            setItems((prev) => {
              return [
                ...prev,
                {
                  text: "Prepare for space travel 🧑‍🚀",
                  id: Math.random(),
                  checked: false,
                },
              ];
            })
          }
        >
          Add item
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={() => setItems(ITEMS)}>
                <Icon.Repeat />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset task list</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <LayoutGroup>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            margin: "0",
            padding: "0",
            width: "100%",
          })()}
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                className="flex items-center justify-between gap-6"
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <Reorder.Item
                  className="border rounded-md cursor-grab flex-grow h-full list-none m-0"
                  style={{
                    position: "relative", // /!\ this is needed to avoid weird overlap
                    borderRadius: "12px",
                    width: item.checked ? "70%" : "100%", // layout resize animation
                  }}
                  value={item}
                >
                  <motion.div
                    layout="position"
                    className="flex items-center gap-6 px-4 py-2"
                  >
                    <Checkbox
                      id={`checkbox-${item.id}`}
                      aria-label="Mark as done"
                      checked={item.checked}
                      onCheckedChange={() => completeItem(item.id)}
                    />
                    <div>{item.text}</div>
                  </motion.div>
                </Reorder.Item>
                <AnimatePresence initial={false}>
                  {item.checked ? (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        size="icon"
                        onClick={() =>
                          setItems((prev) =>
                            prev.filter((task) => task.id !== item.id)
                          )
                        }
                      >
                        <Icon.X />
                      </Button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </Reorder.Group>
        <motion.div layout>
          <div>{`完成后检查列表中的项目!`}</div>
        </motion.div>
      </LayoutGroup>
    </Card>
  );
};

export default AdvanceReorderExample;
