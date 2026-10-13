export function getProjectAnchor(name: string): string {
  return `project-${name.toLowerCase().replaceAll(" ", "-")}`;
}
