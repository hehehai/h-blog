import Container from "../components/Container";
import Project from "../components/ProjectItem";
import allProjects from "../data/projects/list.json";

export default function Projects() {
  return (
    <Container>
      <div className="space-y-10">
        {allProjects.map((project, idx) => (
          <Project key={idx} {...project} />
        ))}
      </div>
    </Container>
  );
}
