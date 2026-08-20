import { createFileRoute } from "@tanstack/react-router";
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
    <div>
      <div className="space-y-14">
        {ownerProjects.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
      <div className="mt-14 mb-4">贡献</div>
      <div className="space-y-14">
        {contributionProjects.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}
