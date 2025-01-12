import { Sandpack, type SandpackProps } from '@codesandbox/sandpack-react';
import { customTheme } from './theme';

export default function SandpackWrapper(props: SandpackProps) {
  return (
    <div className="sandpack-root">
      <Sandpack
        {...props}
        theme={customTheme}
        options={{
          classes: {
            'sp-layout': '!rounded-xl shadow-lg dark:shadow-lg-dark',
          },
          showLineNumbers: true, // default - true
          showInlineErrors: true, // default - false
          wrapContent: true, // default - false
          editorHeight: 550, // default - 300
          externalResources: ['https://cdn.tailwindcss.com'],
          ...props.options,
        }}
      />
    </div>
  );
}
