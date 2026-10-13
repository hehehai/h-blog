import { useEffect, useRef, useState } from "react";

const HEADING_ANCHOR_PREFIX = /^#\s*/;

type Heading = { id: string; level: number; text: string };

export function ArticleOutline({ slug }: { slug: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1200px)");
    const sync = (): void => {
      if (detailsRef.current) {
        detailsRef.current.open = media.matches;
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [headings.length]);

  useEffect(() => {
    const article = document.getElementById("article-body");
    if (!article) {
      return;
    }
    let elements: HTMLHeadingElement[] = [];
    let frame = 0;
    const update = (): void => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight + 140);
      const progress = Math.min(1, Math.max(0, (140 - rect.top) / distance));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      let current = elements[0]?.id ?? "";
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= 150) {
          current = element.id;
        }
      }
      setActiveId(current);
    };
    const schedule = (): void => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };
    const collect = (): void => {
      elements = [
        ...article.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
      ].filter((heading) => !heading.closest(".not-prose"));
      setHeadings(
        elements.map((heading) => ({
          id: heading.id,
          level: Number(heading.tagName.slice(1)),
          text: heading.textContent?.replace(HEADING_ANCHOR_PREFIX, "") ?? "",
        }))
      );
      schedule();
    };
    collect();
    const mutations = new MutationObserver(collect);
    mutations.observe(article, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      mutations.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [slug]);

  return (
    <>
      <div aria-hidden="true" className="article-progress" ref={progressRef} />
      {headings.length > 0 && (
        <aside className="article-outline">
          <details ref={detailsRef}>
            <summary>文章目录</summary>
            <nav aria-label="文章目录">
              {headings.map((heading) => (
                <a
                  aria-current={
                    activeId === heading.id ? "location" : undefined
                  }
                  className={
                    heading.level === 3 ? "outline-subheading" : undefined
                  }
                  href={`#${heading.id}`}
                  key={heading.id}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </details>
        </aside>
      )}
    </>
  );
}
