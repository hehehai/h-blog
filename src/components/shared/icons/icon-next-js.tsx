import type { SVGProps } from 'react';

export default function NextJSIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <title>NextJS</title>
      <defs>
        <linearGradient id="c" x1="55.63%" x2="83.23%" y1="56.38%" y2="96.08%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="d" x1="50%" x2="49.95%" y1="0%" y2="73.44%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <circle id="a" cx="128" cy="128" r="128" />
      </defs>
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <g mask="url(#b)">
        <circle cx="128" cy="128" r="128" />
        <path
          fill="url(#c)"
          d="M212.63 224.03 98.33 76.8H76.8v102.36h17.23V98.68L199.1 234.45a128.43 128.43 0 0 0 13.52-10.42Z"
        />
        <path fill="url(#d)" d="M163.56 76.8h17.06v102.4h-17.06z" />
      </g>
    </svg>
  );
}
