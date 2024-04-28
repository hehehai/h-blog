import { useTheme } from "@maximeheckel/design-system";
import snippet1 from "./snippet1";
import snippet2 from "./snippet2";
import snippet3 from "./snippet3";
import snippet4 from "./snippet4";
import snippet5 from "./snippet5";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const SandpackBlock = dynamic(() => import("../../SandpackBlock"));

const SceneCSSDark = `
html {
    background: #20222B;
    color: white;
}

canvas {
    width: 100vw;
    height: 100vh;
}`;

const SceneCSSLight = `
html {
    background: #F7F7FB;
    color: black;
}

canvas {
    width: 100vw;
    height: 100vh;
}`;

const SNIPPETS = {
  snippet1,
  snippet2,
  snippet3,
  snippet4,
  snippet5,
};

const GuideToFramerMotionSandpack = (props: any) => {
  const { snippet } = props;
  const { dark } = useTheme();

  return (
    <>
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center min-h-[550px]">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <SandpackBlock
          autorun
          template="react"
          customSetup={{
            dependencies: {
              "framer-motion": "6.2.4",
            },
          }}
          files={{
            "/App.js": {
              // @ts-ignore
              code: SNIPPETS[snippet],
            },
            "/scene.css": {
              code: dark ? SceneCSSDark : SceneCSSLight,
              hidden: true,
            },
          }}
        />
      </Suspense>
    </>
  );
};

export default GuideToFramerMotionSandpack;
