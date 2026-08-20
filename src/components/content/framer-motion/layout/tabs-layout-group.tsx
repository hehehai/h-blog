"use client";

import { LayoutGroup } from "motion/react";
import React from "react";
import { TainwildBox, TainwildText } from "@/components/lib/tainwild";
import { Card } from "@/components/ui/card";

const TabsSharedLayoutAnimation = () => {
  const [focused, setFocused] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState("Item 1");
  const tabs = ["Item 1", "Item 2", "Item 3"];

  return (
    <div className="flex items-center justify-center gap-8 rounded-lg border border-[#2B303B] bg-[#1A1D23] px-4 py-2">
      {tabs.map((item) => (
        <TainwildBox
          as="div"
          css={{
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            height: "30px",
            justifyContent: "center",
            listStyle: "none",
            outline: "none",
            position: "relative",
            whiteSpace: "nowrap",
            width: "60px",
          }}
          key={item}
          onClick={() => setSelected(item)}
          onFocus={() => setFocused(item)}
          onKeyDown={(event: { key: string }) =>
            event.key === "Enter" ? setSelected(item) : null
          }
          onMouseEnter={() => setFocused(item)}
          onMouseLeave={() => setFocused(null)}
          tabIndex={0}
        >
          <TainwildText
            css={{
              bottom: 0,
              color: "#E8E8FD",
              left: 4,
              lineHeight: "1.5",
              position: "absolute",
              right: 0,
              top: 2,
              userSelect: "none",
              zIndex: 1,
            }}
            size="sm"
          >
            {item}
          </TainwildText>

          {focused === item ? (
            <TainwildBox
              css={{
                background: "#23272F",
                borderRadius: "8px",
                bottom: "-2px",
                height: "110%",
                left: "-10px",
                position: "absolute",
                right: 0,
                width: "140%",
                zIndex: 0,
              }}
              layoutId="highlight"
              transition={{
                layout: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
            />
          ) : null}
          {selected === item ? (
            <TainwildBox
              css={{
                background: "#5686F5",
                borderRadius: "8px",
                bottom: "-10px",
                height: "4px",
                left: "0px",
                position: "absolute",
                right: 0,
                zIndex: 0,
              }}
              layoutId="underline"
            />
          ) : null}
        </TainwildBox>
      ))}
    </div>
  );
};

const TabsLayoutGroup = (props: { layoutGroup: boolean }) => {
  const { layoutGroup } = props;

  const codeString = `const Tabs = ({ id }) => {
  const [focused, setFocused]
    = React.useState(null);
  const [selected, setSelected]
    = React.useState('Item 1');
  const tabs = [
    'Item 1',
    'Item 2',
    'Item 3'
  ];

  return (
    <LayoutGroup id={id}>
      <Wrapper
        onMouseLeave={() =>
          setFocused(null)
        }
      >
        {tabs.map((item) => (
          <Tab {/*...*/}>
  {/* Tab implementation... */}
          </Tab>
        )}
      </Wrapper>
    </LayoutGroup>
  );`;

  return (
    <Card>
      <div className="mx-auto flex max-w-[380px] flex-col items-center space-y-4 py-10">
        {layoutGroup ? (
          <>
            <LayoutGroup id="tab1">
              <TabsSharedLayoutAnimation />
            </LayoutGroup>
            <LayoutGroup id="tab2">
              <TabsSharedLayoutAnimation />
            </LayoutGroup>
          </>
        ) : (
          <>
            <TabsSharedLayoutAnimation />
            <TabsSharedLayoutAnimation />
          </>
        )}
      </div>
      {layoutGroup ? (
        <pre className="m-0 block rounded-xl">
          <code>{codeString}</code>
        </pre>
      ) : null}
    </Card>
  );
};

export default TabsLayoutGroup;
