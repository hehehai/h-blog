import { createServerFn } from "@tanstack/react-start";

// Read the clock inside a request, not during Workers module initialization.
// Serializing the result also keeps prerendered HTML and hydration in sync.
export const getCopyrightYear = createServerFn({ method: "GET" }).handler(
  (): number => new Date().getUTCFullYear()
);
