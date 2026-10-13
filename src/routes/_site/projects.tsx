import { createFileRoute } from "@tanstack/react-router";
import { PageHeading } from "@/components/shared/page-heading";
import Project from "@/components/shared/project/project-item";
import contributionProjects from "@/contents/projects/contribution.json";
import ownerProjects from "@/contents/projects/owner.json";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/_site/projects")({
  component: Projects,
  head: () =>
    createSeoHead({
      description: "一块木头参与和维护的开源项目与个人项目。",
      path: "/projects",
      title: "项目 | Hehehai @一块木头",
    }),
});

function Projects() {
  return (
    <div className="projects-page">
      <PageHeading
        description="从一个小想法，到可以使用的产品。这里是我的独立项目与开源贡献。"
        eyebrow="想法，付诸实践"
        title="构建一些有用的东西。"
      />
      <section aria-labelledby="own-projects">
        <div className="section-heading">
          <h2 id="own-projects">独立项目</h2>
          <span className="eyebrow">
            {String(ownerProjects.length).padStart(2, "0")} 个项目
          </span>
        </div>
        <div className="project-grid">
          {ownerProjects.map((project) => (
            <Project key={project.name} {...project} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="contributions"
        className="contributions-section"
      >
        <div className="section-heading">
          <h2 id="contributions">开源贡献</h2>
          <span className="eyebrow">共同构建</span>
        </div>
        <div className="project-grid">
          {contributionProjects.map((project) => (
            <Project key={project.name} {...project} />
          ))}
        </div>
      </section>
      <aside className="content-placeholder">
        <span className="eyebrow">项目手记 · 待补充</span>
        <p>设计决策、实现过程与复盘，将在这里陆续整理。</p>
      </aside>
    </div>
  );
}
