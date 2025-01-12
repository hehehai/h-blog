import type { SVGProps } from 'react';

export default function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Twitter</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.64 22.55C11 27.45 11 33.92 11 46.86v6.28c0 12.94 0 19.42 2.64 24.3a22 22 0 0 0 8.91 8.92C27.45 89 33.92 89 46.86 89h6.28c12.94 0 19.42 0 24.3-2.64a22 22 0 0 0 8.92-8.91C89 72.55 89 66.08 89 53.14v-6.28c0-12.94 0-19.42-2.64-24.3a22 22 0 0 0-8.91-8.92C72.55 11 66.08 11 53.14 11h-6.28c-12.94 0-19.42 0-24.3 2.64a22 22 0 0 0-8.92 8.91ZM72.47 26l-17.5 20.32L74 74H60L47.2 55.36 31.15 74H27l18.35-21.31L27 26h14l12.13 17.65L68.33 26h4.14ZM47.43 50.26l1.86 2.66 12.67 18.1h6.36L52.81 48.84l-1.86-2.66L39 29.12h-6.37l14.8 21.14Z"
        fill="currentColor"
      />
    </svg>
  );
}
