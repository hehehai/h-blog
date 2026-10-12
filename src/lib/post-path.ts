const postExtensionPattern = /\.mdx?$/;
const pathSeparatorPattern = /[/\\]/;
const postSlugPattern = /^[a-zA-Z0-9_-]+$/;

export function isPostSlug(slug: string): boolean {
  return slug.length <= 200 && postSlugPattern.test(slug);
}

// Public URLs use the filename, even when sources are grouped in directories.
export function getPostSlug(filePath: string): string {
  const fileName = filePath.split(pathSeparatorPattern).at(-1) ?? "";
  const slug = fileName.replace(postExtensionPattern, "");

  if (!(postExtensionPattern.test(fileName) && isPostSlug(slug))) {
    throw new Error(`Invalid post filename: ${filePath}`);
  }

  return slug;
}
