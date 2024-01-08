import Container from "~/components/Container";

export default function About() {
  return (
    <Container>
      <article className="prose prose-slate dark:prose-invert">
        <h2 className="font-bold">@一块木头</h2>
        <p>
          我是一位专注于前端开发的工程师。我深具探索精神,热衷于使用最新的技术来带来创新用户体验。
          <br />
          我擅长使用 TypeScript、React 和 Vue
          等流行框架来构建互动和响应式的用户界面。我善于运用最佳实践来设计系统架构,确保应用程序扩展性强、可维护性好。
        </p>
        <p>目前，我正在探索 Open Graph 的设计和网站数据分析 Soon。</p>
        <p>
          我热衷于学习新技术和设计理念。如果您正寻找一位前端开发人员,欢迎与我联系。我期待以专业和负责任的态度为您的项目作出贡献。
          <br />
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
