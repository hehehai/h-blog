import { SVGMotionProps, motion } from "framer-motion";

export default function MoonIcon(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      width={"1em"}
      height={"1em"}
      viewBox="0 0 100 100"
      fill="currentColor"
      {...props}
    >
      <path
        d="M82.56 63.43c-.55-.92-2.08-2.36-5.91-1.68a28.73 28.73 0 0 1-26.62-9.2 27.76 27.76 0 0 1-7.2-18.37c0-3.9.75-7.65 2.28-11.2 1.5-3.46.45-5.27-.3-6.02-.79-.78-2.63-1.88-6.26-.37a35.25 35.25 0 0 0-21.59 34.88C18 65.58 27.9 77.64 41.01 82.19a34.17 34.17 0 0 0 9.88 1.87c.54.04 1.1.07 1.64.07 11.44 0 22.17-5.4 28.94-14.59 2.29-3.17 1.67-5.19 1.1-6.11Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}
