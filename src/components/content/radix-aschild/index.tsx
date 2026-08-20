import { lazy } from "react";

export const Demo1Code = lazy(() => import("./demo-code"));

export const Demo2Code = lazy(() => import("./demo2"));

export const DemoSlot = lazy(() => import("./demo-slot"));

export const DemoBadge = lazy(() => import("./demo-badge"));

export const DemoCustom = lazy(() => import("./demo-custom"));
