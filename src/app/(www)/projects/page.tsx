import Project from '@/components/shared/project/project-item';
import contributionProjects from '@/contents/projects/contribution.json';
import ownerProjects from '@/contents/projects/owner.json';

export default function Projects() {
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
