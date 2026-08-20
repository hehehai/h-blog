import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind CSS classes
export function tainwildCss(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Backward compatibility - simple CSS-in-JS utility
export const css = (styles: React.CSSProperties) => styles;
