import type { SVGProps } from 'react';

export default function WebsiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Website</title>
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2Zm.18 12.63-2.22 2.22a2.75 2.75 0 0 1-3.88-3.89l1.41-1.41a.75.75 0 0 1 1.06 0c.29.29.29.77 0 1.06l-1.41 1.41a1.25 1.25 0 1 0 1.77 1.77l2.22-2.22a3.24 3.24 0 0 0 0-4.6 3.33 3.33 0 0 0-4.6 0L8.29 11.4a2.7 2.7 0 0 0 0 3.79c.29.29.29.77 0 1.06a.75.75 0 0 1-1.06 0 4.18 4.18 0 0 1 0-5.91l2.42-2.42c.9-.9 2.09-1.39 3.36-1.39a4.71 4.71 0 0 1 4.75 4.75c0 1.27-.49 2.46-1.39 3.35Z"
        fill="currentColor"
      />
    </svg>
  );
}
