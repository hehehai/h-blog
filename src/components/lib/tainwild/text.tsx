import * as React from "react";
import { TainwildBox } from "./box";

interface TainwildTextProps extends React.ComponentProps<typeof TainwildBox> {
  align?: "left" | "center" | "right" | "justify";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "label";
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
}

const TainwildText = React.forwardRef<HTMLDivElement, TainwildTextProps>(
  (
    {
      size = "base",
      weight = "normal",
      align = "left",
      as: asProp,
      className,
      css: cssProp,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Map size to Tailwind classes and CSS properties
    const sizeStyles = React.useMemo(() => {
      const sizeMap = {
        "2xl": { fontSize: "1.5rem", lineHeight: "2rem" },
        "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" },
        "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" },
        "5xl": { fontSize: "3rem", lineHeight: "1" },
        "6xl": { fontSize: "3.75rem", lineHeight: "1" },
        "7xl": { fontSize: "4.5rem", lineHeight: "1" },
        "8xl": { fontSize: "6rem", lineHeight: "1" },
        "9xl": { fontSize: "8rem", lineHeight: "1" },
        base: { fontSize: "1rem", lineHeight: "1.5rem" },
        lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
        sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
        xl: { fontSize: "1.25rem", lineHeight: "1.75rem" },
        xs: { fontSize: "0.75rem", lineHeight: "1rem" },
      };
      return sizeMap[size];
    }, [size]);

    // Map weight to CSS properties
    const weightStyles = React.useMemo(() => {
      const weightMap = {
        black: 900,
        bold: 700,
        extrabold: 800,
        extralight: 200,
        light: 300,
        medium: 500,
        normal: 400,
        semibold: 600,
        thin: 100,
      };
      return { fontWeight: weightMap[weight] };
    }, [weight]);

    // Text alignment
    const alignStyles = React.useMemo(
      () => ({
        textAlign: align,
      }),
      [align]
    );

    // Combine all styles
    const combinedStyles = React.useMemo(
      () => ({
        ...sizeStyles,
        ...weightStyles,
        ...alignStyles,
        ...cssProp,
      }),
      [sizeStyles, weightStyles, alignStyles, cssProp]
    );

    // Merge with existing style
    const mergedStyle = React.useMemo(
      () => ({
        ...style,
        ...combinedStyles,
      }),
      [style, combinedStyles]
    );

    // Default element based on context or prop
    const defaultElement = React.useMemo(() => {
      if (asProp) {
        return asProp;
      }
      // Could add logic to choose default based on size or context
      return "span";
    }, [asProp]);

    return (
      <TainwildBox
        as={defaultElement}
        className={className}
        css={mergedStyle}
        ref={ref}
        {...props}
      >
        {children}
      </TainwildBox>
    );
  }
);

TainwildText.displayName = "TainwildText";

export { TainwildText };
