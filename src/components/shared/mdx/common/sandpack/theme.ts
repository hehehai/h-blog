import type { SandpackTheme } from "@codesandbox/sandpack-react";

// 直接定义字体，不再依赖 tailwind.config
const sansFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
const monoFont =
  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace';

export const customTheme: SandpackTheme = {
  colors: {
    accent: "#24292e",
    base: "#24292e",
    clickable: "#959da5",
    disabled: "#d1d4d8",
    hover: "#24292e",
    surface1: "#ffffff",
    surface2: "#F3F3F3",
    surface3: "#f5f5f5",
  },
  font: {
    body: sansFont,
    lineHeight: "24px",
    mono: monoFont,
    size: "14px",
  },
  syntax: {
    comment: {
      color: "#6a737d",
      fontStyle: "normal",
    },
    definition: "#6f42c1",
    keyword: "#d73a49",
    plain: "#24292e",
    property: "#005cc5",
    punctuation: "#24292e",
    static: "#032f62",
    string: "#032f62",
    tag: "#22863a",
  },
};
