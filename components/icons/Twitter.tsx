import { SVGProps } from "react";

export default function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={"1em"}
      height={"1em"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M57.21 44.49 83.61 14h-6.25L54.43 40.47 36.12 14H15l27.69 40.03L15 86h6.26l24.2-27.95L64.82 86h21.12L57.2 44.49Zm-8.57 9.9-2.8-4L23.5 18.69h9.61l18.02 25.6 2.8 3.98 23.42 33.27h-9.61L48.64 54.38Z"
        fill="currentColor"
      />
    </svg>
  );
}
