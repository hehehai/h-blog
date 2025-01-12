import dynamic from 'next/dynamic';

// Guide
export const AnimationTypes = dynamic(() => import('./guide/animation-types'));

export const ClipboardAnimationDetails = dynamic(
  () => import('./guide/clipboard-animation-details')
);

export const GuideToFramerMotionSandpack = dynamic(
  () => import('./guide/sandpack')
);

export const Orchestration = dynamic(() => import('./guide/orchestration'));

// Advanced
export const FramerMotionPropagation = dynamic(
  () => import('./advanced/propagation')
);

export const AdvancedFramerMotionSandpack = dynamic(
  () => import('./advanced/sandpack')
);

export const FramerMotionAnimatePresence = dynamic(
  () => import('./advanced/animate-presence')
);

export const FramerMotionAnimationLayout = dynamic(
  () => import('./advanced/animation-layout')
);

// Layout
export const FramerMotionLayoutAnimationsBasic = dynamic(
  () => import('./layout/basic')
);

export const FramerMotionToastNotificationSandpack = dynamic(
  () => import('./layout/sandpack-notification')
);

export const FramerMotionDistortions = dynamic(
  () => import('./layout/distortions')
);

export const FramerMotionLayoutAnimationsLayoutProp = dynamic(
  () => import('./layout/layout-prop')
);

export const FramerMotionLayoutAnimationsLayoutPosition = dynamic(
  () => import('./layout/layout-position')
);

export const FramerMotionArrowListSandpack = dynamic(
  () => import('./layout/sandpack-arrow-list')
);

export const FramerMotionLayoutAnimationsSharedLayoutAnimationDetails = dynamic(
  () => import('./layout/shared-layout-animation-details')
);

export const FramerMotionTabsSandpack = dynamic(
  () => import('./layout/sandpack-tabs')
);

export const FramerMotionLayoutAnimationsTabsLayoutGroup = dynamic(
  () => import('./layout/tabs-layout-group')
);

export const FramerMotionLayoutAnimationListLayoutGroup = dynamic(
  () => import('./layout/list-layout-group')
);

export const FramerMotionAdvanceReorderExample = dynamic(
  () => import('./layout/advance-reorder-example')
);
