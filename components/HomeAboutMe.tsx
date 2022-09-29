import NextLink from "next/link";

export default function HomeAboutMe() {
  return (
    <div className="max-w-xl">
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
            target="_blank" rel="noreferrer"
          >
            Email
          </a>
          或
          <a
            href="https://twitter.com/riverhohai"
            className="mx-1"
            target="_blank" rel="noreferrer"
          >
            Twitter
          </a>
          。
        </p>
      </article>
      <div className="mt-3">
        <NextLink href="/about">
          <a className="text-slate-700 dark:text-gray-400 underline underline-offset-8 decoration-2 decoration-slate-500 hover:decoration-dotted">
            我的故事 _
          </a>
        </NextLink>
      </div>
    </div>
  );
}
