import SandpackBlock from "@/components/shared/mdx/common/sandpack";
import { ButtonCode, UtilsCode } from "./demo-code";

const AppCode = `import { Button } from "./Button";

export default function App() {
  return <Button
    asChild
    className="demo-1"
    style={{ backgroundColor: "red", color: "red" }}
    onClick={(e) => {
      if (!e.defaultPrevented) {
        console.log("Button");
      }
    }}
  >
    <span
      className="demo-2"
      style={{ backgroundColor: "blue" }}
      onClick={(e) => {
        e.preventDefault();
        console.log("span");
      }}
    >
      hello
    </span>
  </Button>
}`;

export default function Demo2Code() {
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
