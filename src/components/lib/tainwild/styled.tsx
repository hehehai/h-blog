import { motion } from "motion/react";
import * as React from "react";

// Reuse motion props detection from box component
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

type StyleObject = React.CSSProperties & Record<string, unknown>;

type StyledFunction = <C extends React.ElementType>(
  component: C,
  styles: StyleObject | ((props: Record<string, unknown>) => StyleObject)
) => React.ForwardRefExoticComponent<any>;

function toInlineStyle(styles: StyleObject): React.CSSProperties {
  return Object.fromEntries(
    Object.entries(styles).filter(
      ([, value]) => value === null || typeof value !== "object"
    )
  ) as React.CSSProperties;
}

export const styled: StyledFunction = (component, styles) => {
  const StyledComponent = React.forwardRef<any, any>(
    ({ className, style, ...props }, ref) => {
      // Compute styles based on props if function is provided
      const computedStyles =
        typeof styles === "function" ? styles(props) : styles;

      // Check if any motion props are present
      const hasMotionProps = Object.keys(props).some((key) =>
        motionProps.includes(key as any)
      );

      // Merge computed styles with any inline styles
      const mergedStyle = React.useMemo(
        () => toInlineStyle({ ...computedStyles, ...style }),
        [computedStyles, style]
      );

      const finalProps = {
        ...props,
        className,
        ref,
        style: mergedStyle,
      };

      // Render as motion component if motion props detected
      if (hasMotionProps) {
        const MotionComponent: React.ElementType =
          typeof component === "string" ? motion.create(component) : component;
        return React.createElement(MotionComponent, finalProps);
      }

      // Render as regular component
      const Component = component as React.ElementType;
      return React.createElement(Component, finalProps);
    }
  );

  // Set display name for debugging
  const componentName =
    typeof component === "string"
      ? component
      : component.displayName || component.name || "Component";
  StyledComponent.displayName = `Styled(${componentName})`;

  return StyledComponent;
};

// CSS utility function for className generation
export const css = (styles: React.CSSProperties) => {
  // Convert CSS properties to string for inline styles
  // This is a simplified implementation - in a real scenario you might want
  // to use a more sophisticated CSS-in-JS solution
  return () => styles;
};
