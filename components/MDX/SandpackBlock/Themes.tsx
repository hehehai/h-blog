/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { SandpackTheme } from "@codesandbox/sandpack-react";
import tailwindConfig from "../../../tailwind.config";

export const CustomTheme: SandpackTheme = {
  colors: {
    surface1: "#ffffff",
    surface2: "#F3F3F3",
    surface3: "#f5f5f5",
    clickable: "#959da5",
    base: "#24292e",
    disabled: "#d1d4d8",
    hover: "#24292e",
    accent: "#24292e",
  },
  syntax: {
    keyword: "#d73a49",
    property: "#005cc5",
    plain: "#24292e",
    static: "#032f62",
    string: "#032f62",
    definition: "#6f42c1",
    punctuation: "#24292e",
    tag: "#22863a",
    comment: {
      color: "#6a737d",
      fontStyle: "normal",
    },
  },
  font: {
    body: tailwindConfig.theme.extend.fontFamily.sans
      .join(", ")
      .replace(/"/gm, ""),
    mono: tailwindConfig.theme.extend.fontFamily.mono
      .join(", ")
      .replace(/"/gm, ""),
    size: "14px",
    lineHeight: "24px",
  },
};