import SandpackBlock from "@/components/shared/mdx/common/sandpack";
import { UtilsCode } from "./demo-code";

const BadgeCode = `import { cn } from "./utils";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { CheckCircle, CircleAlert, Loader2 } from "lucide-react";
import type React from "react";

interface DemoBadgeProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  status?: "pending" | "success" | "fail";
  icon?: React.ReactNode;
}

export function DemoBadge({
  icon,
  status,
  asChild,
  className,
  children,
  ...props
}: DemoBadgeProps) {
  const Comp = asChild ? Slot : "div";

  const statusMap = {
    pending: {
      className: "bg-gray-100 text-slate-800",
      icon: <Loader2 className="animate-spin size-5" />,
    },
    success: {
      className: "bg-green-500 text-white",
      icon: <CheckCircle className="size-5" />,
    },
    fail: {
      className: "bg-red-500 text-white",
      icon: <CircleAlert className="size-5" />,
    },
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent",
        status ? statusMap[status].className : "",
        className
      )}
      {...props}
    >
      {icon ? icon : status ? statusMap[status]?.icon : null}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}`;

const AppCode1 = `import { DemoBadge } from "./Badge";

export default function App() {
  return <DemoBadge status="fail">123</DemoBadge>
}`;

const AppCode2 = `import { DemoBadge } from "./Badge";

export default function App() {
  return <DemoBadge status="fail" asChild>
    <button type="button">123</button>
  </DemoBadge>
}`;

export default function DemoBadge({ type = "1" }: { type?: "1" | "2" }) {
  return (
    <SandpackBlock
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
          code: type === "1" ? AppCode1 : AppCode2,
        },
        "/Badge.tsx": {
          code: BadgeCode,
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
