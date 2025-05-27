import dynamic from "next/dynamic";

export const Demo1Code = dynamic(() => import("./demo-code"));

export const Demo2Code = dynamic(() => import("./demo2"));

export const DemoSlot = dynamic(() => import("./demo-slot"));

export const DemoBadge = dynamic(() => import("./demo-badge"));

export const DemoCustom = dynamic(() => import("./demo-custom"));
