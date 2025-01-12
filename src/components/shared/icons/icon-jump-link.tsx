import type { SVGProps } from 'react';

export default function JumpLink(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Jump Link</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.81 2.17a.82.82 0 1 0 0 1.63h2.4l-6.8 6.8a.82.82 0 1 0 1.16 1.15l6.8-6.79v2.4a.82.82 0 1 0 1.63 0V2.98a.82.82 0 0 0-.82-.82h-4.37ZM3 12.17c.45 0 .81.36.81.81v1.83c0 2.2.45 3.52 1.24 4.31.8.8 2.12 1.24 4.31 1.24h5.46c2.2 0 3.52-.44 4.31-1.24.8-.8 1.24-2.11 1.24-4.3v-1.83A.82.82 0 0 1 22 13v1.82c0 2.36-.47 4.22-1.72 5.47S17.17 22 14.81 22H9.35c-2.35 0-4.21-.47-5.47-1.72-1.25-1.25-1.71-3.11-1.71-5.47v-1.83c0-.45.36-.81.82-.81Zm6.36-10c-2.35 0-4.21.46-5.47 1.71C2.63 5.14 2.17 7 2.17 9.35a.82.82 0 1 0 1.63 0c0-2.19.45-3.51 1.24-4.3.8-.8 2.12-1.25 4.31-1.25h1.82a.82.82 0 1 0 0-1.63H9.35Z"
        fill="currentColor"
      />
    </svg>
  );
}
