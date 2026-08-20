import { lazy } from "react";

// Guide
export const AnimationTypes = lazy(() => import("./guide/animation-types"));

export const ClipboardAnimationDetails = lazy(
  () => import("./guide/clipboard-animation-details")
);

export const GuideToFramerMotionSandpack = lazy(
  () => import("./guide/sandpack")
);

export const Orchestration = lazy(() => import("./guide/orchestration"));

// Advanced
export const FramerMotionPropagation = lazy(
  () => import("./advanced/propagation")
);

export const AdvancedFramerMotionSandpack = lazy(
  () => import("./advanced/sandpack")
);

export const FramerMotionAnimatePresence = lazy(
  () => import("./advanced/animate-presence")
);

export const FramerMotionAnimationLayout = lazy(
  () => import("./advanced/animation-layout")
);

// Layout
export const FramerMotionLayoutAnimationsBasic = lazy(
  () => import("./layout/basic")
);

export const FramerMotionToastNotificationSandpack = lazy(
  () => import("./layout/sandpack-notification")
);

export const FramerMotionDistortions = lazy(
  () => import("./layout/distortions")
);

export const FramerMotionLayoutAnimationsLayoutProp = lazy(
  () => import("./layout/layout-prop")
);

export const FramerMotionLayoutAnimationsLayoutPosition = lazy(
  () => import("./layout/layout-position")
);

export const FramerMotionArrowListSandpack = lazy(
  () => import("./layout/sandpack-arrow-list")
);

export const FramerMotionLayoutAnimationsSharedLayoutAnimationDetails = lazy(
  () => import("./layout/shared-layout-animation-details")
);

export const FramerMotionTabsSandpack = lazy(
  () => import("./layout/sandpack-tabs")
);

export const FramerMotionLayoutAnimationsTabsLayoutGroup = lazy(
  () => import("./layout/tabs-layout-group")
);

export const FramerMotionLayoutAnimationListLayoutGroup = lazy(
  () => import("./layout/list-layout-group")
);

export const FramerMotionAdvanceReorderExample = lazy(
  () => import("./layout/advance-reorder-example")
);
