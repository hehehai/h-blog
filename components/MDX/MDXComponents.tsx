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
import { CarouselMDX } from "./Carousel";
import dynamic from "next/dynamic";
import GuideToFramerMotionSandpack from "./Widgets/GuideToFramerMotion/Sandpack";

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
        "[[data-expanded]>&]:before:rotate-90"
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

const AnimationTypes = dynamic(
  () => import("./Widgets/GuideToFramerMotion/AnimationTypes")
);
const ClipboardAnimationDetails = dynamic(
  () => import("./Widgets/GuideToFramerMotion/ClipboardAnimationDetails")
);

const Orchestration = dynamic(
  () => import("./Widgets/GuideToFramerMotion/Orchestration")
);

const FramerMotionPropagation = dynamic(
  () => import("./Widgets/AdvancedFramerMotion/FramerMotionPropagation")
);

const AdvancedFramerMotionSandpack = dynamic(
  () => import("./Widgets/AdvancedFramerMotion/Sandpack"),
  {
    ssr: false,
  }
);

const FramerMotionAnimatePresence = dynamic(
  () => import("./Widgets/AdvancedFramerMotion/FramerMotionAnimatePresence")
);

const FramerMotionAnimationLayout = dynamic(
  () => import("./Widgets/AdvancedFramerMotion/FramerMotionAnimationLayout")
);

const FramerMotionLayoutAnimationsBasic = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/Basic"),
  {
    ssr: false,
  }
);

const FramerMotionToastNotificationSandpack = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/SandpackNotification"),
  {
    ssr: false,
  }
);

const FramerMotionDistortions = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/Distortions"),
  {
    ssr: false,
  }
);

const FramerMotionLayoutAnimationsLayoutProp = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/LayoutProp"),
  {
    ssr: false,
  }
);

const FramerMotionLayoutAnimationsLayoutPosition = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/LayoutPosition"),
  {
    ssr: false,
  }
);

const FramerMotionArrowListSandpack = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/SandpackArrowList"),
  {
    ssr: false,
  }
);

const FramerMotionLayoutAnimationsSharedLayoutAnimationDetails = dynamic(
  () =>
    import(
      "./Widgets/FramerMotionLayoutAnimations/SharedLayoutAnimationDetails"
    ),
  {
    ssr: false,
  }
);

const FramerMotionTabsSandpack = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/SandpackTabs"),
  {
    ssr: false,
  }
);

const FramerMotionLayoutAnimationsTabsLayoutGroup = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/TabsLayoutGroup"),
  {
    ssr: false,
  }
);

const FramerMotionLayoutAnimationListLayoutGroup = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/ListLayoutGroup"),
  {
    ssr: false,
  }
);

const FramerMotionAdvanceReorderExample = dynamic(
  () => import("./Widgets/FramerMotionLayoutAnimations/AdvanceReorderExample"),
  {
    ssr: false,
  }
);

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
  CarouselMDX,

  // Widgets
  AnimationTypes,
  GuideToFramerMotionSandpack,
  ClipboardAnimationDetails,
  Orchestration,
  FramerMotionPropagation,
  AdvancedFramerMotionSandpack,
  FramerMotionAnimatePresence,
  FramerMotionAnimationLayout,
  FramerMotionLayoutAnimationsBasic,
  FramerMotionToastNotificationSandpack,
  FramerMotionDistortions,
  FramerMotionLayoutAnimationsLayoutProp,
  FramerMotionLayoutAnimationsLayoutPosition,
  FramerMotionArrowListSandpack,
  FramerMotionLayoutAnimationsSharedLayoutAnimationDetails,
  FramerMotionTabsSandpack,
  FramerMotionLayoutAnimationsTabsLayoutGroup,
  FramerMotionLayoutAnimationListLayoutGroup,
  FramerMotionAdvanceReorderExample,
};

export default MDXComponents;
