import EmbedStackblitz from "../EmbedStackblitz";
import InlineCode from "./InlineCode";
import SandpackBlock from "./SandpackBlock";
import CustomLink from "../CustomLink";
import PreCode from "./PreCode";
import { DemoMenuBox } from "../_posts/css-clip-path";
import {
  Children,
  ComponentProps,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useState,
} from "react";
import { DetailsProvider, useDetails } from "contexts/details";
import { Collapse } from "../Collapse";
import { cn } from "lib/utils";
import { Callout } from "../Callout";

const findSummary = (children: ReactNode) => {
  let summary: ReactNode = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child, index) => {
    if (child && (child as ReactElement).type === Summary) {
      summary ||= child;
      return;
    }

    let c = child;
    if (
      !summary &&
      child &&
      typeof child === "object" &&
      (child as ReactElement).type !== Details &&
      "props" in child &&
      child.props
    ) {
      const result = findSummary(child.props.children);
      summary = result[0];
      c = cloneElement(child, {
        ...child.props,
        children: result[1]?.length ? result[1] : undefined,
        key: index,
      });
    }
    restChildren.push(c);
  });

  return [summary, restChildren];
};

const Details = ({
  children,
  open,
  ...props
}: ComponentProps<"details">): ReactElement => {
  const [openState, setOpen] = useState(!!open);
  const [summary, restChildren] = findSummary(children);

  // To animate the close animation we have to delay the DOM node state here.
  const [delayedOpenState, setDelayedOpenState] = useState(openState);
  useEffect(() => {
    if (openState) {
      setDelayedOpenState(true);
    } else {
      const timeout = setTimeout(() => setDelayedOpenState(openState), 500);
      return () => clearTimeout(timeout);
    }
  }, [openState]);

  return (
    <details
      className="my-4 rounded-xl border border-gray-200/60 bg-neutral-100 p-3 first:mt-0 dark:border-gray-800 dark:bg-gray-900"
      {...props}
      open={delayedOpenState}
      {...(openState && { "data-expanded": true })}
    >
      <DetailsProvider value={setOpen}>{summary}</DetailsProvider>
      <Collapse isOpen={openState}>{restChildren}</Collapse>
    </details>
  );
};

const Summary = (props: ComponentProps<"summary">): ReactElement => {
  const setOpen = useDetails();
  return (
    <summary
      className={cn(
        "flex items-center cursor-pointer list-none p-1.5 transition-colors rounded-lg hover:bg-white/80 dark:hover:bg-gray-700 text-foreground",
        "before:mr-1 before:inline-block before:transition-transform before:content-[''] dark:before:invert before:shrink-0 text-lg",
        "rtl:before:rotate-180 [[data-expanded]>&]:before:rotate-90"
      )}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        setOpen((v) => !v);
      }}
    />
  );
};

export function FAQBox({
  title,
  open = true,
  children,
}: {
  title: string;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <Details open={open}>
      <Summary>{title}</Summary>
      {children}
    </Details>
  );
}

const MDXComponents = {
  a: CustomLink,
  // img: RoundedImage,
  code: InlineCode,
  pre: PreCode,
  details: Details,
  summary: Summary,
  FAQBox: FAQBox,
  Callout,
  EmbedStackblitz,
  SandpackBlock,
  DemoMenuBox,
};

export default MDXComponents;
