import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import { PageHeading } from "@/components/shared/page-heading";
import { authorProfile } from "@/lib/config/author";
import { siteConfig } from "@/lib/config/site";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/_site/about")({
  component: About,
  head: () =>
    createSeoHead({
      description: authorProfile.description,
      path: "/about",
      title: "关于我 | Hehehai @一块木头",
    }),
});

function About() {
  return (
    <div className="about-page">
      <PageHeading
        description="写代码，做产品，也记录沿途的发现。"
        eyebrow="你好，我是一块木头"
        title="把想法做出来。"
      />
      <div className="about-layout">
        <aside className="about-card">
          <AuthorAvatar className="about-avatar" size={72} />
          <h2>{authorProfile.name}</h2>
          <p>Hehehai · {authorProfile.role}</p>
          <div className="about-tags">
            {authorProfile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <a className="text-link" href={`mailto:${siteConfig.email}`}>
            发一封邮件 <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </aside>
        <article className="about-story prose dark:prose-invert">
          <h2>我在做什么</h2>
          <p>{authorProfile.intro}</p>
          <p>
            我使用 TypeScript、React 和 Vue 开发界面，也用 Node.js、Python
            处理后端逻辑。除了把功能做出来，我更在意它是否容易理解、使用和维护。
          </p>
          <h2>最近在探索什么</h2>
          <p>
            我正在探索本地模型和桌面应用，比如本地优先的语音转文本应用{" "}
            <a
              href="https://voxt.actnow.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Voxt
            </a>
            。我想把新的技术能力，放进简单、自然的使用流程里。
          </p>
          <Link className="text-link" to="/projects">
            看看这些项目 <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
          <h2>为什么写这个网站</h2>
          <p>
            这里记录我的技术实践、独立项目，以及屏幕之外的生活。文章里有完整的教程，也有阶段性的笔记；我会保留探索过程，并说明尚未完成或需要重新验证的部分。
          </p>
          <p>
            接触编程不算早，但工作之后一直在做自己喜欢的事情。这些记录，也是提醒自己继续学习、认真构建的一种方式。
          </p>
          <h2>保持联系</h2>
          <p>
            如果你想交流技术、讨论一个产品想法，或寻找全栈开发合作，欢迎通过邮件或{" "}
            <a
              href={siteConfig.twitter}
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </a>{" "}
            联系我。
          </p>
        </article>
      </div>
      <aside className="content-placeholder">
        <p className="eyebrow">经历与项目复盘 · 待补充</p>
        <p>
          后续会整理更具体的项目背景、负责的工作与过程记录，不以占位内容代替真实经历。
        </p>
      </aside>
    </div>
  );
}
