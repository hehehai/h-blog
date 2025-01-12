import tailwindConfig from '@/tailwind.config';
import type { SandpackTheme } from '@codesandbox/sandpack-react';

const tailwindFontFamily = (tailwindConfig.theme?.extend?.fontFamily ??
  {}) as Record<string, string[]>;

const sansFont = tailwindFontFamily?.sans?.join(', ').replace(/"/gm, '');

const monoFont = tailwindFontFamily?.mono?.join(', ').replace(/"/gm, '');

export const customTheme: SandpackTheme = {
  colors: {
    surface1: '#ffffff',
    surface2: '#F3F3F3',
    surface3: '#f5f5f5',
    clickable: '#959da5',
    base: '#24292e',
    disabled: '#d1d4d8',
    hover: '#24292e',
    accent: '#24292e',
  },
  syntax: {
    keyword: '#d73a49',
    property: '#005cc5',
    plain: '#24292e',
    static: '#032f62',
    string: '#032f62',
    definition: '#6f42c1',
    punctuation: '#24292e',
    tag: '#22863a',
    comment: {
      color: '#6a737d',
      fontStyle: 'normal',
    },
  },
  font: {
    body: sansFont,
    mono: monoFont,
    size: '14px',
    lineHeight: '24px',
  },
};
