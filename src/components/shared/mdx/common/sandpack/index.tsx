import type { SandpackProps } from '@codesandbox/sandpack-react';
import { Suspense, lazy, memo } from 'react';
import { SandpackHolder } from './holder';

const SandpackWrapper = lazy(() => import('./wrapper'));

const SandpackBlock = memo(function Sandpack({
  options,
  ...props
}: SandpackProps) {
  const { externalResources, ...rest } = options || {};
  return (
    <Suspense fallback={<SandpackHolder code={'Hello World!'} />}>
      <SandpackWrapper
        {...props}
        options={{
          rtl: true,
          externalResources: [
            ...(externalResources || []),
            'https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css',
          ],
          ...rest,
        }}
      />
    </Suspense>
  );
});

export default SandpackBlock;
