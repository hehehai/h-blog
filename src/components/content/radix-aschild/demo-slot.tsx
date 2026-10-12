import SandpackBlock from "@/components/shared/mdx/common/sandpack";
import { RADIX_SANDBOX_DEPENDENCIES } from "@/lib/sandbox-dependencies";
import { UtilsCode } from "./demo-code";

const ButtonCode = `import { cn } from "./utils";
import { Slot } from "@radix-ui/react-slot";
import type React from "react";

interface DemoButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function DemoButton({ asChild, className, ...props }: DemoButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "bg-slate-900 text-white px-1.5 py-0.5 rounded-sm",
        className
      )}
      {...props}
    />
  );
}`;

const AppCode = `import { DemoButton } from "./Button";

export default function App() {
  return <DemoButton asChild><span>hello</span></DemoButton>
}`;

export default function DemoSlot() {
  return (
    <SandpackBlock
      customSetup={{
        dependencies: RADIX_SANDBOX_DEPENDENCIES,
      }}
      files={{
        "/App.tsx": {
          active: true,
          code: AppCode,
        },
        "/Button.tsx": {
          code: ButtonCode,
        },
        "/utils.ts": {
          code: UtilsCode,
        },
      }}
      options={{ showConsole: true }}
      template="react-ts"
    />
  );
}
