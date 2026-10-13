import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import ownerProjects from "@/contents/projects/owner.json";

const featuredProjects = ownerProjects.slice(0, 3);

export function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const project = featuredProjects[index];
  const selectProject = (direction: number): void => {
    setIndex(
      (current) =>
        (current + direction + featuredProjects.length) %
        featuredProjects.length
    );
  };

  return (
    <section
      aria-label="精选项目"
      aria-roledescription="轮播"
      className="project-showcase"
    >
      <div className="showcase-stack">
        <Link
          aria-label={`查看 ${project.name} 和更多项目`}
          className="showcase-card showcase-flip"
          key={project.name}
          to="/projects"
        >
          <Image
            alt={`${project.name} 项目界面`}
            className="showcase-image"
            height={500}
            key={project.name}
            layout="constrained"
            loading="eager"
            src={project.cover}
            width={800}
          />
          <span className="showcase-open">
            <ArrowUpRight aria-hidden="true" size={18} />
            <span className="sr-only">查看项目</span>
          </span>
        </Link>
      </div>
      <div className="showcase-caption">
        <div aria-atomic="true" aria-live="polite">
          <p className="eyebrow">
            精选项目 · {String(index + 1).padStart(2, "0")} /{" "}
            {String(featuredProjects.length).padStart(2, "0")}
          </p>
          <h2>
            {project.name}
            <span>{project.subtitle}</span>
          </h2>
        </div>
        <div className="showcase-controls">
          <button
            aria-label="上一个项目"
            className="icon-button"
            onClick={() => selectProject(-1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <button
            aria-label="下一个项目"
            className="icon-button"
            onClick={() => selectProject(1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      </div>
      <div aria-label="选择精选项目" className="showcase-steps" role="group">
        {featuredProjects.map((item, projectIndex) => (
          <button
            aria-label={`展示 ${item.name}`}
            aria-pressed={index === projectIndex}
            className="showcase-step"
            key={item.name}
            onClick={() => setIndex(projectIndex)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
