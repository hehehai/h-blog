import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { CustomTheme } from "./Themes";

export default function SandpackRoot(props: SandpackProps) {
  return (
    <div className="sandpack-root">
      <Sandpack
        {...props}
        theme={CustomTheme}
        options={{
          classes: {
            "sp-layout": "!rounded-lg shadow-lg dark:shadow-lg-dark",
          },
          showLineNumbers: true, // default - true
          showInlineErrors: true, // default - false
          wrapContent: true, // default - false
          editorHeight: 550, // default - 300
        }}
      />
    </div>
  );
}
