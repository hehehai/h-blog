import { dependencies, devDependencies } from "../../package.json";

const versionPrefixPattern = /^[~^]/;

// Sandpack resolves packages outside our lockfile. Use the version recorded in
// the manifest, not its floating range, so an iframe cannot silently upgrade
// these direct dependencies. Provider-owned transitive packages remain upstream-managed.
function sandboxVersion(version: string): string {
  return version.replace(versionPrefixPattern, "");
}

export const REACT_SANDBOX_DEPENDENCIES = {
  react: sandboxVersion(dependencies.react),
  "react-dom": sandboxVersion(dependencies["react-dom"]),
};

export const MOTION_SANDBOX_DEPENDENCIES = {
  "@stitches/react": "1.2.8",
  "framer-motion": sandboxVersion(dependencies.motion),
  ...REACT_SANDBOX_DEPENDENCIES,
};

export const RADIX_SANDBOX_DEPENDENCIES = {
  "@radix-ui/react-slot": sandboxVersion(dependencies["@radix-ui/react-slot"]),
  "class-variance-authority": sandboxVersion(
    dependencies["class-variance-authority"]
  ),
  clsx: sandboxVersion(dependencies.clsx),
  "lucide-react": sandboxVersion(dependencies["lucide-react"]),
  "tailwind-merge": sandboxVersion(dependencies["tailwind-merge"]),
  ...REACT_SANDBOX_DEPENDENCIES,
};

export const SANDBOX_TAILWIND_URL = `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@${sandboxVersion(devDependencies.tailwindcss)}/dist/index.global.js`;

export const REACT_SANDBOX_ENTRY = {
  code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);`,
  hidden: true,
};
