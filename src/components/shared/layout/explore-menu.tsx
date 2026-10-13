import { useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ButtonThemeToggle from "@/components/shared/button-theme-toggle";
import { SocialLinks } from "@/components/shared/social-links";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NavBar from "./nav-bar";

export function ExploreMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  const dots = useRef<HTMLSpanElement>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = (): void => {
      frame = 0;
      dots.current?.style.setProperty(
        "--orbit-angle",
        `${media.matches ? 0 : window.scrollY / 8}deg`
      );
    };
    const schedule = (): void => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    media.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      media.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="explore-dock">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <button
            aria-label={open ? "关闭站点导航" : "打开站点导航"}
            className="explore-trigger"
            disabled={!mounted}
            title="探索本站"
            type="button"
          >
            <span aria-hidden="true" className="explore-orbit" ref={dots}>
              {[0, 1, 2, 3, 4, 5].map((dot) => (
                <span key={dot} />
              ))}
            </span>
            <span className="sr-only">探索本站</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          aria-label="站点导航"
          className="explore-panel"
          side="top"
          sideOffset={10}
        >
          <div className="explore-panel-heading">
            <h2>浏览本站</h2>
            <button
              aria-label="关闭导航面板"
              className="icon-button"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={17} />
            </button>
          </div>
          <NavBar onNavigate={() => setOpen(false)} />
          <div className="explore-panel-bottom">
            <SocialLinks iconsOnly />
            <ButtonThemeToggle />
          </div>
        </PopoverContent>
      </Popover>
      <noscript>
        <a className="explore-nojs" href="#site-navigation">
          浏览本站
        </a>
      </noscript>
    </div>
  );
}
