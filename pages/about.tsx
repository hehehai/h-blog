import Container from "../components/Container";
import NextLink from "next/link";

export default function About() {
  return (
    <Container>
      <article className="prose dark:prose-invert">
        <h2 className="font-bold">@一块木头</h2>
        <p>
          我是一位自学的软件开发人员，专注于前端应用程序和用户界面设计。我的首选技术栈是
          TypeScript、Vue 和 Node。
        </p>
        <p>
          目前，我正在构建 <NextLink href="/projects">开源网站应用</NextLink> 
          ，帮助人们更轻松使用网页工具来学习和实践所学的知识。
        </p>
        <p>
          我对设计系统、网页可访问性、前端架构和设计模式非常感兴趣。要联系我，请使用
          <a
            href="mailto: riverhohai@gmail.com"
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
          或
          <a
            href="https://twitter.com/riverhohai"
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          。
        </p>
        <h3 className="font-bold">我的故事</h3>
        <p>
          我是在大二的时候接触了 PhotoShop
          之后开始自学计算机视觉设计的知识，了解颜色、文字排版、视图结构等。大三就在一家传媒公司做兼职，成为了一名平面设计师。
        </p>
        <p>
          在工作中接触了网页开发，这种职业首先看起来很高级的样子，于是又开始了自学。学习网页基础、交互动效、网络服务等，直到我真的找到了一份前端开发的工作。
        </p>
        <p>
          很庆幸工作之后一直在做自己喜欢的事情，虽然接触编程较晚，但我觉得我找到了自己所擅长的东西，值得我为之努力!
        </p>
      </article>
    </Container>
  );
}
