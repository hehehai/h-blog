"use client";

import { AnimatePresence, LayoutGroup, motion, Reorder } from "motion/react";
import React from "react";
import { css, Icon } from "@/components/lib/tainwild";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ITEMS = [
  {
    checked: false,
    id: 1,
    text: "Finish blog post ✍️",
  },
  {
    checked: false,
    id: 2,
    text: "Build new Three.js experiences ✨",
  },
  {
    checked: false,
    id: 3,
    text: "Add new components to Design System 🌈",
  },
  {
    checked: false,
    id: 4,
    text: "Make some coffee ☕️",
  },
  {
    checked: false,
    id: 5,
    text: "Drink water 💧",
  },
  {
    checked: false,
    id: 6,
    text: "Go to the gym 🏃‍♂️",
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
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex gap-2">
        <Button
          disabled={items.length > 5}
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                checked: false,
                id: Math.random(),
                text: "Prepare for space travel 🧑‍🚀",
              },
            ])
          }
        >
          添加
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setItems(ITEMS)} size="icon">
                <Icon.Repeat />
              </Button>
            </TooltipTrigger>
            <TooltipContent>复位列表</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <LayoutGroup>
        <Reorder.Group
          axis="y"
          onReorder={setItems}
          style={css({
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            margin: "0",
            padding: "0",
            width: "100%",
          })}
          values={items}
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex items-center justify-between gap-6"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                initial={{ opacity: 0 }}
                key={item.id}
              >
                <Reorder.Item
                  className="m-0 h-full flex-grow cursor-grab list-none rounded-md border"
                  style={{
                    borderRadius: "12px",
                    position: "relative", // /!\ this is needed to avoid weird overlap
                    width: item.checked ? "70%" : "100%", // layout resize animation
                  }}
                  value={item}
                >
                  <motion.div
                    className="flex items-center gap-6 px-4 py-2"
                    layout="position"
                  >
                    <Checkbox
                      aria-label="Mark as done"
                      checked={item.checked}
                      id={`checkbox-${item.id}`}
                      onCheckedChange={() => completeItem(item.id)}
                    />
                    <div>{item.text}</div>
                  </motion.div>
                </Reorder.Item>
                <AnimatePresence initial={false}>
                  {item.checked ? (
                    <motion.div
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      layout
                    >
                      <Button
                        onClick={() =>
                          setItems((prev) =>
                            prev.filter((task) => task.id !== item.id)
                          )
                        }
                        size="icon"
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
          <div>{"完成后检查列表中的项目!"}</div>
        </motion.div>
      </LayoutGroup>
    </Card>
  );
};

export default AdvanceReorderExample;
