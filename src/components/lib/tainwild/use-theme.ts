import { useTheme } from "@/components/shared/theme-provider";

export interface UseTainwildThemeReturn {
  dark: boolean;
  forcedTheme?: string;
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
  systemTheme?: "light" | "dark";
  theme?: string;
}

export const useTainwildTheme = (): UseTainwildThemeReturn => {
  const themeData = useTheme();

  return {
    ...themeData,
    dark: themeData.resolvedTheme === "dark" || themeData.theme === "dark",
  };
};
