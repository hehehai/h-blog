import GiscusReact from "@giscus/react";

interface GiscusProps {
  theme?: "light" | "dark";
  repo?: `${string}/${string}`;
  repoId?: string;
  category?: string;
  categoryId?: string;
  term?: string;
}

export const Giscus: React.FC<GiscusProps> = ({
  theme = "light",
  repo,
  repoId,
  category,
  categoryId,
  term = "Welcome to my blog.",
}) => {
  if (!repo || !repoId) {
    return null;
  }

  return (
    <GiscusReact
      id="comments"
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="zh-CN"
      loading="lazy"
    />
  );
};
