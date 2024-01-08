import EmbedStackblitz from "../EmbedStackblitz";
import InlineCode from "./InlineCode";
import SandpackBlock from "./SandpackBlock";
import CustomLink from "../CustomLink";
import PreCode from "./PreCode";
import { DemoMenuBox } from "../_posts/css-clip-path";

function Callout(props: any) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

const MDXComponents = {
  a: CustomLink,
  // img: RoundedImage,
  code: InlineCode,
  pre: PreCode,
  Callout,
  EmbedStackblitz,
  SandpackBlock,
  DemoMenuBox
};

export default MDXComponents;
