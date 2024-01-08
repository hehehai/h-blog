import Container from "~/components/Container";
import Project from "~/components/ProjectItem";
import ownerProjects from "../data/projects/owner.json";
import contributionProjects from "../data/projects/contribution.json";

export const config = {
  runtime: 'experimental-edge',
}

export default function Projects() {
  return (
    <Container>
      <div className="space-y-14">
        {ownerProjects.map((project, idx) => (
          <Project key={idx} {...project} />
        ))}
      </div>
      <div className="mt-14 mb-4">贡献</div>
      <div className="space-y-14">
        {contributionProjects.map((project, idx) => (
          <Project key={idx} {...project} />
        ))}
      </div>
    </Container>
  );
}
