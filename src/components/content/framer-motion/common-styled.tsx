import type { CSSProperties, FormHTMLAttributes, HTMLAttributes } from "react";
import React from "react";

type StyledDivProps = HTMLAttributes<HTMLDivElement> & {
  css?: CSSProperties;
};

const mergeStyles = (
  css: CSSProperties | undefined,
  style: CSSProperties | undefined
) => ({ ...css, ...style });

export const TransitionGridWrapper = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function TransitionGridWrapper({ className, ...props }, ref) {
  return (
    <div
      className={["tainwild-transition-grid", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      {...props}
    />
  );
});

export const AnimationCardContent = React.forwardRef<
  HTMLDivElement,
  StyledDivProps
>(function AnimationCardContent({ className, css, style, ...props }, ref) {
  return (
    <div
      className={["tainwild-animation-card-content", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      style={mergeStyles(css, style)}
      {...props}
    />
  );
});

export const HighlightedValue = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function HighlightedValue({ className, ...props }, ref) {
  return (
    <div
      className={["tainwild-highlighted-value", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      {...props}
    />
  );
});

export const Wrapper = React.forwardRef<HTMLDivElement, StyledDivProps>(
  function Wrapper({ className, css, style, ...props }, ref) {
    return (
      <div
        className={["tainwild-framer-wrapper", className]
          .filter(Boolean)
          .join(" ")}
        ref={ref}
        style={mergeStyles(css, style)}
        {...props}
      />
    );
  }
);

export const Form = React.forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement> & { css?: CSSProperties }
>(function Form({ className, css, style, ...props }, ref) {
  return (
    <form
      className={["tainwild-framer-form", className].filter(Boolean).join(" ")}
      ref={ref}
      style={mergeStyles(css, style)}
      {...props}
    />
  );
});
