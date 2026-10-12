import { resolve } from "node:path";
import { normalizePath, type Plugin } from "vite";

// MDX components have normal React HMR, but their metadata lives behind server
// functions. Refresh after generation so route loaders/head data cannot stay stale.
export function contentMetadataReload(): Plugin {
  let generatedIndex: string;

  return {
    apply: "serve",
    configResolved(config) {
      generatedIndex = normalizePath(
        resolve(config.root, ".content-collections/generated/index.js")
      );
    },
    handleHotUpdate({ file, server }) {
      if (file === generatedIndex) {
        server.ws.send({ type: "full-reload" });
      }
    },
    name: "content-metadata-reload",
  };
}
