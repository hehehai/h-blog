import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { QueryPostItem } from "@/functions/post";
import PostList from "./post-list";

export function PostBrowser({ posts }: { posts: QueryPostItem[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const item of post.tags ?? []) {
        counts.set(item, (counts.get(item) ?? 0) + 1);
      }
    }
    return [...counts]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);
  }, [posts]);
  const filtered = posts.filter(
    (post) =>
      (!tag || post.tags?.includes(tag)) &&
      `${post.title} ${post.description} ${post.tags?.join(" ")}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase())
  );

  return (
    <div>
      <div className="post-toolbar">
        <div aria-label="按标签筛选" className="post-filters" role="group">
          {["", ...tags].map((item) => (
            <button
              aria-pressed={tag === item}
              className="filter-button"
              key={item}
              onClick={() => setTag(item)}
              type="button"
            >
              {item || "全部"}
            </button>
          ))}
        </div>
        <div className="post-search">
          <Search aria-hidden="true" size={16} />
          <label className="sr-only" htmlFor="post-search">
            搜索文章
          </label>
          <input
            id="post-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索文章…"
            type="search"
            value={query}
          />
          {query && (
            <button
              aria-label="清除搜索"
              className="search-clear"
              onClick={() => setQuery("")}
              type="button"
            >
              <X aria-hidden="true" size={14} />
            </button>
          )}
        </div>
      </div>
      <p aria-live="polite" className="result-count">
        {query || tag
          ? `找到 ${filtered.length} 篇文章`
          : `共 ${posts.length} 篇文章`}
      </p>
      <PostList headingLevel="h2" posts={filtered} />
    </div>
  );
}
