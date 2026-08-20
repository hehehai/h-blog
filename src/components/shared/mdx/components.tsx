import type { MDXComponents } from "mdx/types";
import { Callout } from "./common/callout";
import { CarouselMDX } from "./common/carousel";
import { FAQBox } from "./common/detail";
import { Details } from "./common/detail/detail";
import { Summary } from "./common/detail/summary";
import EmbedStackblitz from "./common/embed-stackblitz";
import Iframe from "./common/iframe";
import SandpackBlock from "./common/sandpack";
import ElementCode from "./elements/code";
import ElementLink from "./elements/link";
import ElementPreCode from "./elements/pre-code";

export const components: MDXComponents = {
  a: ElementLink,
  Callout,
  CarouselMDX,
  // img: RoundedImage,
  code: ElementCode,
  details: Details,
  EmbedStackblitz,
  FAQBox,
  Iframe,
  pre: ElementPreCode,
  SandpackBlock,
  summary: Summary,
};
