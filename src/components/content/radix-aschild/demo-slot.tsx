import SandpackBlock from "@/components/shared/mdx/common/sandpack";
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
      template="react-ts"
      options={{ showConsole: true }}
      customSetup={{
        dependencies: {
          "@radix-ui/react-slot": "^1.2.0",
          "class-variance-authority": "^0.7.1",
          clsx: "^2.1.1",
          "lucide-react": "^0.487.0",
          "tailwind-merge": "^3.2.0",
        },
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
    />
  );
}
