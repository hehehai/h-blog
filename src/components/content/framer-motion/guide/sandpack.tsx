'use client';

import { useTheme } from '@maximeheckel/design-system';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import snippet1 from './snippet1';
import snippet2 from './snippet2';
import snippet3 from './snippet3';
import snippet4 from './snippet4';
import snippet5 from './snippet5';

const SandpackBlock = dynamic(
  () => import('../../../shared/mdx/common/sandpack')
);

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

const GuideToFramerMotionSandpack = ({ snippet }: { snippet: string }) => {
  const { dark } = useTheme();

  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-[550px] w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <SandpackBlock
          options={{
            autorun: true,
          }}
          template="react"
          customSetup={{
            dependencies: {
              'framer-motion': '6.2.4',
            },
          }}
          files={{
            '/App.js': {
              code: SNIPPETS[snippet as keyof typeof SNIPPETS],
            },
            '/scene.css': {
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
