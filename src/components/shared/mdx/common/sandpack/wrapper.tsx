import { Sandpack, type SandpackProps } from "@codesandbox/sandpack-react";
import { REACT_SANDBOX_DEPENDENCIES } from "@/lib/sandbox-dependencies";
import { customTheme } from "./theme";

export default function SandpackWrapper({
  customSetup,
  template = "react",
  ...props
}: SandpackProps) {
  const usesReact = template === "react" || template === "react-ts";

  return (
    <div className="sandpack-root">
      <Sandpack
        {...props}
        customSetup={{
          ...customSetup,
          dependencies: {
            ...(usesReact ? REACT_SANDBOX_DEPENDENCIES : {}),
            ...customSetup?.dependencies,
          },
        }}
        options={{
          classes: {
            "sp-layout": "!rounded-xl shadow-lg dark:shadow-lg-dark",
          },
          editorHeight: 550, // default - 300
          showInlineErrors: true, // default - false
          showLineNumbers: true, // default - true
          wrapContent: true, // default - false
          ...props.options,
        }}
        template={template}
        theme={customTheme}
      />
    </div>
  );
}
