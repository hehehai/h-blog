import { AnimatePresence } from "framer-motion";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import { useState } from "react";

const navMap = [
  {
    href: "/about",
    text: "关于我",
  },
  {
    href: "/posts",
    text: "文章",
  },
  {
    href: "/projects",
    text: "项目",
  },
  {
    href: "/photos",
    text: "照片",
  },
];

export default function Navigator() {
  const [hover, setHover] = useState("");

  return (
    <AnimatePresence mode="wait">
      <div className="text-lg flex items-center py-2 md:py-6 mt-5">
        {navMap.map(({ href, text }) => (
          <NavItem
            active={hover === href}
            key={href}
            href={href}
            text={text}
            onMouseEnter={() => setHover(href)}
            onMouseLeave={() => setHover("")}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
