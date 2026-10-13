import {
  Root as SliderRoot,
  Thumb as SliderThumb,
  Track as SliderTrack,
} from "@radix-ui/react-slider";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Shuffle, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import ownerProjects from "@/contents/projects/owner.json";
import { getProjectAnchor } from "@/lib/project-anchor";

const featuredProjects = ownerProjects.slice(0, 6);
const VISIBLE_CARDS = 3;
type FeaturedProject = (typeof featuredProjects)[number];
type PointerStart = { id: number; x: number; y: number };

function ShowcaseCard({
  project,
  depth,
  reducedMotion,
  onClickCapture,
  onKeyDown,
}: {
  project: FeaturedProject;
  depth: number;
  reducedMotion: boolean;
  onClickCapture: (event: MouseEvent<HTMLAnchorElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}) {
  const present = useIsPresent();
  const active = depth === 0 && present;
  return (
    <motion.div
      animate={{
        opacity: 1,
        rotateX: 0,
        scale: 1 - depth * 0.04,
        y: `${depth * 6.5}%`,
      }}
      className="showcase-layer"
      data-showcase-active={active}
      data-showcase-depth={depth}
      exit={{
        opacity: 0,
        rotateX: reducedMotion ? 0 : -55,
        scale: 0.96,
        y: reducedMotion ? "0%" : "-28%",
        zIndex: 10,
      }}
      initial={{
        opacity: 1,
        rotateX: depth === 0 && !reducedMotion ? -8 : 0,
        scale: depth === 0 ? 0.98 : 1 - depth * 0.04,
        y: depth === 0 && !reducedMotion ? "-6%" : `${depth * 6.5}%`,
      }}
      style={{
        pointerEvents: active ? "auto" : "none",
        zIndex: VISIBLE_CARDS - depth,
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              damping: 24,
              mass: 0.7,
              opacity: { duration: 0.2 },
              stiffness: 150,
              type: "spring",
              zIndex: { duration: 0 },
            }
      }
    >
      <Link
        aria-hidden={!active}
        aria-label={`查看 ${project.name} 项目`}
        className="showcase-card"
        draggable={false}
        hash={getProjectAnchor(project.name)}
        inert={!active}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        tabIndex={active ? 0 : -1}
        to="/projects"
      >
        <Image
          alt={active ? `${project.name} 项目界面` : ""}
          className="showcase-image"
          draggable={false}
          height={534}
          layout="constrained"
          loading="eager"
          src={project.cover}
          width={800}
        />
        <span aria-hidden="true" className="showcase-card-hint">
          查看项目 ↗
        </span>
      </Link>
    </motion.div>
  );
}

export function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const deck = useRef<HTMLDivElement>(null);
  const shuffleButton = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<PointerStart | null>(null);
  const suppressClick = useRef(false);
  const focusFront = useRef(false);
  const project = featuredProjects[index];
  const visibleProjects = Array.from({ length: VISIBLE_CARDS }, (_, depth) => ({
    depth,
    project: featuredProjects[(index + depth) % featuredProjects.length],
  })).reverse();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (focusFront.current) {
      deck.current
        ?.querySelector<HTMLAnchorElement>('[data-showcase-active="true"] a')
        ?.focus({ preventScroll: true });
      focusFront.current = false;
    }
  }, [index]);

  const selectProject = (next: number): void => {
    setIndex((next + featuredProjects.length) % featuredProjects.length);
  };
  const shuffle = (): void => {
    setShuffled(true);
    selectProject(
      index + 1 + Math.floor(Math.random() * (featuredProjects.length - 1))
    );
  };
  const reset = (): void => {
    shuffleButton.current?.focus({ preventScroll: true });
    setShuffled(false);
    selectProject(0);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (
      !mounted ||
      (event.target instanceof Element &&
        event.target.closest("[data-showcase-slider]"))
    ) {
      return;
    }
    const next =
      event.key === "ArrowRight"
        ? index + 1
        : event.key === "ArrowLeft"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? featuredProjects.length - 1
              : null;
    if (next === null) {
      return;
    }
    event.preventDefault();
    focusFront.current =
      event.target instanceof Element &&
      !!event.target.closest(".showcase-card");
    selectProject(next);
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.button !== 0 || !mounted) {
      return;
    }
    suppressClick.current = false;
    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) {
      return;
    }
    if (
      Math.abs(event.clientX - start.x) > 12 &&
      Math.abs(event.clientX - start.x) >
        Math.abs(event.clientY - start.y) * 1.2
    ) {
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) {
      return;
    }
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) >= 40 && Math.abs(x) > Math.abs(y) * 1.2) {
      suppressClick.current = true;
      selectProject(index + (x < 0 ? 1 : -1));
    }
  };
  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (suppressClick.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick.current = false;
    }
  };

  return (
    <section
      aria-label="精选项目"
      aria-roledescription="轮播"
      className="project-showcase"
    >
      <div className="showcase-scene">
        <div
          className="showcase-stack"
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          ref={deck}
        >
          <AnimatePresence initial={false}>
            {visibleProjects.map(({ project: item, depth }) => (
              <ShowcaseCard
                depth={depth}
                key={item.name}
                onClickCapture={handleCardClick}
                onKeyDown={handleKeyDown}
                project={item}
                reducedMotion={reducedMotion}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="showcase-position">
          <SliderRoot
            className="showcase-slider"
            data-showcase-slider=""
            disabled={!mounted}
            inverted
            max={featuredProjects.length - 1}
            min={0}
            onValueChange={([next]) => selectProject(next)}
            orientation="vertical"
            step={1}
            value={[index]}
          >
            <SliderTrack className="showcase-track" />
            <SliderThumb
              aria-label="选择精选项目"
              aria-valuetext={`${index + 1} / ${featuredProjects.length}，${project.name}`}
              className="showcase-thumb"
            />
          </SliderRoot>
        </div>
      </div>
      <div className="showcase-caption">
        <div
          aria-atomic="true"
          aria-live="polite"
          className="showcase-description"
        >
          <p className="eyebrow">
            {project.name} · 独立项目 {String(index + 1).padStart(2, "0")} /{" "}
            {String(featuredProjects.length).padStart(2, "0")}
          </p>
          <div className="showcase-caption-text" key={project.name}>
            <h2>{project.subtitle}</h2>
          </div>
        </div>
        <div className="showcase-controls">
          {shuffled && (
            <button
              aria-label="回到精选项目起点"
              className="icon-button"
              onClick={reset}
              title="回到精选项目起点"
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
          )}
          <button
            aria-label="随机发现一个项目"
            className="icon-button showcase-shuffle"
            data-shuffled={shuffled}
            disabled={!mounted}
            onClick={shuffle}
            ref={shuffleButton}
            title="随机发现一个项目"
            type="button"
          >
            <Shuffle
              aria-hidden="true"
              className="showcase-shuffle-icon"
              size={18}
            />
          </button>
        </div>
      </div>
      <p className="sr-only">
        可拖动右侧滑块、左右滑动卡片，或在卡片上使用左右方向键切换。上下滚动仍用于浏览页面。
      </p>
    </section>
  );
}
