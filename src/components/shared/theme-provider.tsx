"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeValue = string;
type ResolvedTheme = "light" | "dark";

export interface ThemeProviderProps {
  attribute?: string;
  children: ReactNode;
  defaultTheme?: ThemeValue;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  enableSystem?: boolean;
  forcedTheme?: ThemeValue;
  storageKey?: string;
  themes?: ThemeValue[];
}

export interface ThemeContextValue {
  forcedTheme?: ThemeValue;
  resolvedTheme?: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
  systemTheme?: ResolvedTheme;
  theme?: ThemeValue;
  themes: ThemeValue[];
}

const DEFAULT_THEMES: ThemeValue[] = ["light", "dark"];
const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

const ThemeContext = createContext<ThemeContextValue>({
  setTheme: () => undefined,
  themes: DEFAULT_THEMES,
});

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

function resolveTheme(theme: ThemeValue, enableSystem: boolean): ThemeValue {
  return theme === "system" && enableSystem ? getSystemTheme() : theme;
}

function setDocumentTheme(
  attribute: string,
  theme: ThemeValue,
  themes: ThemeValue[],
  enableSystem: boolean,
  enableColorScheme: boolean,
  disableTransitionOnChange: boolean
): ThemeValue {
  const resolvedTheme = resolveTheme(theme, enableSystem);
  const documentElement = document.documentElement;
  const transitionStyle = disableTransitionOnChange
    ? document.createElement("style")
    : null;

  if (transitionStyle) {
    transitionStyle.appendChild(
      document.createTextNode(
        "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
      )
    );
    document.head.appendChild(transitionStyle);
  }

  if (attribute === "class") {
    documentElement.classList.remove(...themes);
    documentElement.classList.add(resolvedTheme);
  } else {
    documentElement.setAttribute(attribute, resolvedTheme);
  }

  if (enableColorScheme) {
    documentElement.style.colorScheme = ["light", "dark"].includes(
      resolvedTheme
    )
      ? resolvedTheme
      : "";
  }

  if (transitionStyle) {
    window.getComputedStyle(document.body);
    window.setTimeout(() => transitionStyle.remove(), 1);
  }

  return resolvedTheme;
}

export function ThemeProvider({
  attribute = "data-theme",
  children,
  defaultTheme = "system",
  disableTransitionOnChange = false,
  enableColorScheme = true,
  enableSystem = true,
  forcedTheme,
  storageKey = "theme",
  themes = DEFAULT_THEMES,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeValue>();
  const [resolvedTheme, setResolvedTheme] = useState<ThemeValue>();
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>();

  const applyTheme = useCallback(
    (nextTheme: ThemeValue) =>
      setDocumentTheme(
        attribute,
        nextTheme,
        themes,
        enableSystem,
        enableColorScheme,
        disableTransitionOnChange
      ),
    [
      attribute,
      disableTransitionOnChange,
      enableColorScheme,
      enableSystem,
      themes,
    ]
  );

  const setTheme = useCallback(
    (nextTheme: ThemeValue) => {
      setThemeState(nextTheme);
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Storage can be unavailable in private browsing contexts.
      }
      setResolvedTheme(applyTheme(nextTheme));
    },
    [applyTheme, storageKey]
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    const initialTheme = forcedTheme ?? storedTheme ?? defaultTheme;
    const nextResolvedTheme = applyTheme(initialTheme);

    setThemeState(initialTheme);
    setResolvedTheme(nextResolvedTheme);
    setSystemTheme(getSystemTheme());

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    const handleSystemThemeChange = () => {
      if (initialTheme === "system" && enableSystem) {
        setSystemTheme(getSystemTheme());
        setResolvedTheme(applyTheme("system"));
      }
    };
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return;
      }

      const nextTheme = event.newValue ?? defaultTheme;
      setThemeState(nextTheme);
      setResolvedTheme(applyTheme(nextTheme));
      if (nextTheme === "system") {
        setSystemTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [applyTheme, defaultTheme, enableSystem, forcedTheme, storageKey]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      forcedTheme,
      resolvedTheme,
      setTheme,
      systemTheme,
      theme,
      themes: enableSystem ? [...themes, "system"] : themes,
    }),
    [
      enableSystem,
      forcedTheme,
      resolvedTheme,
      setTheme,
      systemTheme,
      theme,
      themes,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
