import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config/site";

export default function ShortAboutMe() {
  return (
    <div className="max-w-xl">
      <article className="prose prose-slate dark:prose-invert text-foreground">
        <h2 className="font-bold">@一块木头</h2>
        <p>
          我是一名全栈开发工程师。我深具探索精神,热衷于使用最新的技术来带来创新用户体验。
          <br />
          我擅长使用 TypeScript、React 和 Vue
          等流行框架来构建互动和响应式的用户界面，采用 Nodejs、Python
          等后端语言服务构建安全稳定的后端服务。我善于运用最佳实践来设计系统架构,确保应用程序扩展性强、可维护性好。
        </p>
        <p>
          目前，我正在探索本地模型的应用场景，比如{" "}
          <a href="https://voxt.actnow.dev">Voxt</a>。
        </p>
        <p>
          我热衷于学习新技术和设计理念。如果您正寻找一位全栈开发人员，欢迎与我联系。我期待以专业和负责任的态度为您的项目作出贡献。
          <br />
          <a
            className="mx-1"
            href={`mailto: ${siteConfig.email}`}
            rel="noreferrer"
            target="_blank"
          >
            Email
          </a>
          或
          <a
            className="mx-1"
            href={siteConfig.twitter}
            rel="noreferrer"
            target="_blank"
          >
            Twitter
          </a>
        </p>
      </article>
      <div className="mt-3">
        <Link
          className="text-slate-700 underline decoration-2 decoration-slate-500 underline-offset-8 hover:decoration-dotted dark:text-gray-400"
          to="/about"
        >
          我的故事 _
        </Link>
      </div>
    </div>
  );
}
