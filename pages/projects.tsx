import Container from "../components/Container";
import allProjects from '../data/projects/list.json'

export default function Projects() {
  
  return <Container>
    <div>
      {allProjects.map((project, idx) => <div key={idx}>{project.name}</div>)}
    </div>
  </Container>
}
