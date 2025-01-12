import { siteConfig } from '@/lib/config/site';
import NextLink from 'next/link';

export default function ShortAboutMe() {
  return (
    <div className="max-w-xl">
      <article className="prose prose-slate dark:prose-invert text-foreground">
        <h2 className="font-bold">@一块木头</h2>
        <p>
          我是一位专注于前端开发的工程师。我深具探索精神，热衷于使用最新的技术来带来创新用户体验。
          <br />
          我擅长使用 TypeScript、React 和 Vue
          等流行框架来构建互动和响应式的用户界面。我善于运用最佳实践来设计系统架构，确保应用程序扩展性强、可维护性好。
        </p>
        <p>目前，我正在探索 Open Graph 的设计和网站数据分析 [Soon]。</p>
        <p>
          我热衷于学习新技术和设计理念。如果您正寻找一位前端开发人员，欢迎与我联系。我期待以专业和负责任的态度为您的项目作出贡献。
          <br />
          <a
            href={`mailto: ${siteConfig.email}`}
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
          或
          <a
            href={siteConfig.twitter}
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </p>
      </article>
      <div className="mt-3">
        <NextLink
          href="/about"
          className="text-slate-700 underline decoration-2 decoration-slate-500 underline-offset-8 hover:decoration-dotted dark:text-gray-400"
        >
          我的故事 _
        </NextLink>
      </div>
    </div>
  );
}
