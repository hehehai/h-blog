import type { MDXComponents } from 'mdx/types';
import { Callout } from './common/callout';
import { CarouselMDX } from './common/carousel';
import { FAQBox } from './common/detail';
import { Details } from './common/detail/detail';
import { Summary } from './common/detail/summary';
import EmbedStackblitz from './common/embed-stackblitz';
import SandpackBlock from './common/sandpack';
import ElementCode from './elements/code';
import ElementLink from './elements/link';
import ElementPreCode from './elements/pre-code';

export const components: MDXComponents = {
  a: ElementLink,
  // img: RoundedImage,
  code: ElementCode,
  pre: ElementPreCode,
  details: Details,
  summary: Summary,
  FAQBox: FAQBox,
  Callout,
  EmbedStackblitz,
  SandpackBlock,
  CarouselMDX,
};
