import type { SandpackProps } from "@codesandbox/sandpack-react";
import { lazy, memo, Suspense } from "react";
import { SandpackHolder } from "./holder";

const SandpackWrapper = lazy(() => import("./wrapper"));

const SandpackBlock = memo(function Sandpack({
  options,
  ...props
}: SandpackProps) {
  const { externalResources, ...rest } = options || {};
  return (
    <Suspense fallback={<SandpackHolder code={"Hello World!"} />}>
      <SandpackWrapper
        {...props}
        options={{
          externalResources: [
            ...(externalResources || []),
            "https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
          ],
          rtl: true,
          ...rest,
        }}
      />
    </Suspense>
  );
});

export default SandpackBlock;
