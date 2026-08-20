import { Slot } from "@radix-ui/react-slot";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

// Framer Motion props that trigger motion component upgrade
const motionProps = [
  "animate",
  "initial",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "exit",
  "variants",
  "custom",
  "transition",
  "layout",
  "layoutId",
  "layoutScroll",
  "layoutRoot",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "onAnimationStart",
  "onAnimationComplete",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onDirectionLock",
  "onDragTransitionEnd",
] as const;

type TainwildStyle = React.CSSProperties & Record<string, unknown>;

interface TainwildBoxProps
  extends Omit<HTMLMotionProps<"div">, "children" | "style"> {
  as?: React.ElementType;
  asChild?: boolean;
  children?: React.ReactNode;
  css?: TainwildStyle;
  style?: React.CSSProperties;
}

function toInlineStyle(
  style: TainwildStyle | React.CSSProperties | undefined
): React.CSSProperties {
  if (!style) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(style).filter(
      ([, value]) => value === null || typeof value !== "object"
    )
  ) as React.CSSProperties;
}

const TainwildBox = React.forwardRef<HTMLDivElement, TainwildBoxProps>(
  (
    { className, as, asChild, css: cssProp, style, children, ...props },
    ref
  ) => {
    // Check if any motion props are present
    const hasMotionProps = Object.keys(props).some((key) =>
      motionProps.includes(key as any)
    );

    const mergedStyle = React.useMemo(
      () => toInlineStyle({ ...style, ...cssProp }),
      [style, cssProp]
    );

    const finalProps = {
      ...props,
      className: cn(className),
      style: mergedStyle,
    };
    const renderProps = finalProps as Record<string, unknown>;

    // Determine which component to render
    if (asChild) {
      return (
        <Slot ref={ref} {...renderProps}>
          {children}
        </Slot>
      );
    }

    if (as || hasMotionProps) {
      const Component = as ?? motion.div;
      return (
        <Component ref={ref} {...renderProps}>
          {children}
        </Component>
      );
    }

    return (
      <div ref={ref} {...renderProps}>
        {children}
      </div>
    );
  }
);

TainwildBox.displayName = "TainwildBox";

export { TainwildBox };
