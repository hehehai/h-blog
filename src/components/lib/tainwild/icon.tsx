import type { LucideIcon, LucideProps } from "lucide-react";
import * as Icons from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TainwildIconProps extends LucideProps {
  name: keyof typeof Icons;
}

const TainwildIcon = React.forwardRef<SVGSVGElement, TainwildIconProps>(
  ({ name, size = 24, className, ...props }, ref) => {
    const IconComponent = Icons[name] as LucideIcon | undefined;

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in lucide-react`);
      return (
        <span
          className={cn("inline-block", className)}
          style={{ height: size, width: size }}
        >
          ⚠️
        </span>
      );
    }

    return (
      <IconComponent
        className={cn("shrink-0", className)}
        ref={ref}
        size={size}
        {...props}
      />
    );
  }
);

TainwildIcon.displayName = "TainwildIcon";

// Create backward compatible Icon namespace
export const Icon = {
  Arrow: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="ArrowRight" ref={ref} {...props} />
  ),
  Check: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Check" ref={ref} {...props} />
  ),
  ChevronDown: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="ChevronDown" ref={ref} {...props} />
  ),
  ChevronLeft: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="ChevronLeft" ref={ref} {...props} />
  ),
  ChevronRight: React.forwardRef<
    SVGSVGElement,
    Omit<TainwildIconProps, "name">
  >((props, ref) => <TainwildIcon name="ChevronRight" ref={ref} {...props} />),
  ChevronUp: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="ChevronUp" ref={ref} {...props} />
  ),
  Copy: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Copy" ref={ref} {...props} />
  ),
  Download: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Download" ref={ref} {...props} />
  ),
  Edit: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Edit" ref={ref} {...props} />
  ),
  Eye: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Eye" ref={ref} {...props} />
  ),
  EyeOff: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="EyeOff" ref={ref} {...props} />
  ),
  Heart: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Heart" ref={ref} {...props} />
  ),
  Lock: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Lock" ref={ref} {...props} />
  ),
  Menu: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Menu" ref={ref} {...props} />
  ),
  Minus: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Minus" ref={ref} {...props} />
  ),
  Pause: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Pause" ref={ref} {...props} />
  ),
  Play: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Play" ref={ref} {...props} />
  ),
  Plus: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Plus" ref={ref} {...props} />
  ),
  Repeat: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="RotateCcw" ref={ref} {...props} />
  ),
  Search: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Search" ref={ref} {...props} />
  ),
  Settings: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Settings" ref={ref} {...props} />
  ),
  Stack: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Layers" ref={ref} {...props} />
  ),
  Star: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Star" ref={ref} {...props} />
  ),
  Stop: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Square" ref={ref} {...props} />
  ),
  Trash: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Trash" ref={ref} {...props} />
  ),
  Unlock: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Unlock" ref={ref} {...props} />
  ),
  Upload: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="Upload" ref={ref} {...props} />
  ),
  X: React.forwardRef<SVGSVGElement, Omit<TainwildIconProps, "name">>(
    (props, ref) => <TainwildIcon name="X" ref={ref} {...props} />
  ),
};

export { TainwildIcon };
