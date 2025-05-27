import SandpackBlock from "@/components/shared/mdx/common/sandpack";
import { UtilsCode } from "./demo-code";

const UISlotCode = `import React from "react";

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
	// all child props should override
	const overrideProps = { ...childProps };

	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];

		const isHandler = /^on[A-Z]/.test(propName);
		if (isHandler) {
			// if the handler exists on both, we compose them
			if (slotPropValue && childPropValue) {
				overrideProps[propName] = (...args: unknown[]) => {
					const result = childPropValue(...args);
					slotPropValue(...args);
					return result;
				};
			}
			// but if it exists only on the slot, we use only this one
			else if (slotPropValue) {
				overrideProps[propName] = slotPropValue;
			}
		}
		else if (propName === "style") {
			overrideProps[propName] = { ...slotPropValue, ...childPropValue };
		} else if (propName === "className") {
			overrideProps[propName] = [slotPropValue, childPropValue]
				.filter(Boolean)
				.join(" ");
		}
	}

	return { ...slotProps, ...overrideProps };
}

interface UISlotProps extends React.HTMLAttributes<HTMLElement> {}

export default function UISlot({ children, ...slotProps }: UISlotProps) {
	const childrenArray = React.Children.toArray(children);
	const slottable = childrenArray.find(isSlottable);

	if (slottable) {
		const newElement = slottable.props.children;

		const newChildren = childrenArray.map((child) => {
			if (child === slottable) {
				if (React.Children.count(newElement) > 1) {
					return React.Children.only(null);
				}
				return React.isValidElement(newElement)
					? (newElement.props as { children: React.ReactNode }).children
					: null;
			}
			return child;
		});

		return (
			<UISlot {...slotProps}>
				{React.isValidElement(newElement)
					? React.cloneElement(newElement, undefined, newChildren)
					: null}
			</UISlot>
		);
	}

	if (React.isValidElement(children)) {
		const props = mergeProps(slotProps, children.props as AnyProps);
		return React.cloneElement(children, props);
	}

	if (React.Children.count(children) > 1) {
		return React.Children.only(null);
	}

	return null;
}

const SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");

interface SlottableProps {
	children: React.ReactNode;
}

export function Slottable({ children }: SlottableProps) {
	return <>children</>;
}

Slottable.__radixId = SLOTTABLE_IDENTIFIER;

export function isSlottable(
	element: React.ReactNode,
): element is React.ReactElement<SlottableProps, typeof Slottable> {
	return (
		React.isValidElement(element) &&
		typeof element.type === "function" &&
		"__radixId" in element.type &&
		element.type.__radixId === SLOTTABLE_IDENTIFIER
	);
}`;

const BadgeCode = `import { cn } from "./utils";
import UISlot, { Slottable } from "./UISlot";
import { CheckCircle, CircleAlert, Loader2 } from "lucide-react";
import type React from "react";

interface DemoBadgeProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  status?: "pending" | "success" | "fail";
  icon?: React.ReactNode;
}

export function DemoBadge({
  icon,
  status,
  asChild,
  className,
  children,
  ...props
}: DemoBadgeProps) {
  const Comp = asChild ? UISlot : "div";

  const statusMap = {
    pending: {
      className: "bg-gray-100 text-slate-800",
      icon: <Loader2 className="animate-spin size-5" />,
    },
    success: {
      className: "bg-green-500 text-white",
      icon: <CheckCircle className="size-5" />,
    },
    fail: {
      className: "bg-red-500 text-white",
      icon: <CircleAlert className="size-5" />,
    },
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent",
        status ? statusMap[status].className : "",
        className
      )}
      {...props}
    >
      {icon ? icon : status ? statusMap[status]?.icon : null}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}`;

const AppCode = `import { DemoBadge } from "./Badge";

export default function App() {
  return <DemoBadge status="fail" asChild>
    <button type="button">123</button>
  </DemoBadge>
}`;

export default function DemoCustom() {
  return (
    <SandpackBlock
      template="react-ts"
      options={{ showConsole: true }}
      customSetup={{
        dependencies: {
          "@radix-ui/react-slot": "^1.2.0",
          "class-variance-authority": "^0.7.1",
          clsx: "^2.1.1",
          "lucide-react": "^0.487.0",
          "tailwind-merge": "^3.2.0",
        },
      }}
      files={{
        "/App.tsx": {
          active: true,
          code: AppCode,
        },
        "/Badge.tsx": {
          code: BadgeCode,
        },
        "/UISlot.tsx": {
          code: UISlotCode,
        },
        "/utils.ts": {
          code: UtilsCode,
        },
      }}
    />
  );
}
