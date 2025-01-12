import type { SandpackProps } from '@codesandbox/sandpack-react';
import { Suspense, lazy, memo } from 'react';
import { SandpackHolder } from './holder';

const SandpackWrapper = lazy(() => import('./wrapper'));

const SandpackBlock = memo(function Sandpack(props: SandpackProps) {
  return (
    <Suspense fallback={<SandpackHolder code={'Hello World!'} />}>
      <SandpackWrapper
        {...props}
        options={{
          externalResources: [
            'https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css',
          ],
        }}
      />
    </Suspense>
  );
});

export default SandpackBlock;
