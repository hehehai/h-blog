import { execFile } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { promisify } from "node:util";
import { getPostSlug } from "../src/lib/post-path";

const execFileAsync = promisify(execFile);
const postExtensionPattern = /\.mdx?$/;

type PostSource = {
  filePath: string;
  slug: string;
};

export function getPostSources(directory = "src/contents/posts"): PostSource[] {
  const slugs = new Set<string>();
  const sources = readdirSync(directory, {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile() && postExtensionPattern.test(entry.name))
    .map((entry) => {
      const filePath = relative(directory, join(entry.parentPath, entry.name));
      const slug = getPostSlug(filePath);

      if (slugs.has(slug)) {
        throw new Error(`Duplicate post slug "${slug}": ${filePath}`);
      }

      slugs.add(slug);
      return { filePath, slug };
    });

  return sources.sort((a, b) => a.slug.localeCompare(b.slug, "en"));
}

export async function getPostLastModified(
  filePath: string,
  publicAt: Date,
  cwd = process.cwd()
): Promise<Date> {
  if (!Number.isFinite(publicAt.getTime())) {
    throw new Error(`Invalid publication date for ${filePath}`);
  }

  // Git history is optional (source archives/new posts), not a build requirement.
  // Do not use filesystem mtime or today's date: those change with every checkout.
  try {
    const options = { cwd, timeout: 5000 };
    const { stdout: shallow } = await execFileAsync(
      "git",
      ["rev-parse", "--is-shallow-repository"],
      options
    );

    if (shallow.trim() === "true") {
      return publicAt;
    }

    const { stdout } = await execFileAsync(
      "git",
      ["log", "-1", "--format=%aI", "--", filePath],
      options
    );
    const timestamp = Date.parse(stdout.trim());

    return Number.isFinite(timestamp)
      ? new Date(Math.max(publicAt.getTime(), timestamp))
      : publicAt;
  } catch {
    return publicAt;
  }
}
