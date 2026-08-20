import { Sandpack, type SandpackProps } from "@codesandbox/sandpack-react";
import { customTheme } from "./theme";

export default function SandpackWrapper(props: SandpackProps) {
  return (
    <div className="sandpack-root">
      <Sandpack
        {...props}
        options={{
          classes: {
            "sp-layout": "!rounded-xl shadow-lg dark:shadow-lg-dark",
          },
          editorHeight: 550, // default - 300
          externalResources: ["https://cdn.tailwindcss.com"],
          showInlineErrors: true, // default - false
          showLineNumbers: true, // default - true
          wrapContent: true, // default - false
          ...props.options,
        }}
        theme={customTheme}
      />
    </div>
  );
}
