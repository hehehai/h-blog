import { Sandpack } from "@codesandbox/sandpack-react";
import { lazy, memo, Suspense } from "react";

const SandpackRoot = lazy(() => import("./SandpackRoot"));

function SandpackHolder({ code }: { code: string }) {
  return (
    <div className="sandpack-holder">
      <pre>{code}</pre>
    </div>
  );
}

export default memo(function SandpackWrapper(props: any): any {
  return (
    <Suspense fallback={<SandpackHolder code={"Hello World!"} />}>
      <SandpackRoot {...props} />
    </Suspense>
  );
});
