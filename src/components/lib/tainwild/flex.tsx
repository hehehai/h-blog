import * as React from "react";
import { TainwildBox } from "./box";

interface TainwildFlexProps extends React.ComponentProps<typeof TainwildBox> {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  alignItems?: React.CSSProperties["alignItems"];
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  gap?: React.CSSProperties["gap"];
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  justifyContent?: React.CSSProperties["justifyContent"];
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

const TainwildFlex = React.forwardRef<HTMLDivElement, TainwildFlexProps>(
  (
    {
      direction = "row",
      wrap = "nowrap",
      align = "stretch",
      justify = "start",
      alignItems,
      justifyContent,
      gap,
      className,
      css: cssProp,
      style,
      ...props
    },
    ref
  ) => {
    // Generate flex styles
    const flexStyles = React.useMemo(
      () => ({
        alignItems:
          alignItems ??
          (align === "start"
            ? "flex-start"
            : align === "end"
              ? "flex-end"
              : align),
        display: "flex",
        flexDirection: direction,
        flexWrap: wrap,
        gap,
        justifyContent:
          justifyContent ??
          (justify === "start"
            ? "flex-start"
            : justify === "end"
              ? "flex-end"
              : justify === "between"
                ? "space-between"
                : justify === "around"
                  ? "space-around"
                  : justify === "evenly"
                    ? "space-evenly"
                    : justify),
        ...cssProp,
      }),
      [
        direction,
        wrap,
        align,
        justify,
        alignItems,
        justifyContent,
        gap,
        cssProp,
      ]
    );

    // Merge with existing style
    const mergedStyle = React.useMemo(
      () => ({
        ...style,
        ...flexStyles,
      }),
      [style, flexStyles]
    );

    return (
      <TainwildBox
        className={className}
        css={mergedStyle}
        ref={ref}
        {...props}
      />
    );
  }
);

TainwildFlex.displayName = "TainwildFlex";

export { TainwildFlex };
