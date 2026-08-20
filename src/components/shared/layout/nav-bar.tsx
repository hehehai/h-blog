"use client";

import { useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { navMap } from "@/lib/config/nav";
import NavItem from "./nav-item";

export default function NavBar() {
  const { pathname } = useLocation();
  const [hover, setHover] = useState("");

  return (
    <AnimatePresence mode="wait">
      <div className="mt-5 flex items-center py-2 text-lg md:py-6">
        {navMap.map(({ href, text }) => (
          <NavItem
            active={
              hover === href ||
              pathname === href ||
              pathname.startsWith(`${href}/`)
            }
            href={href}
            key={href}
            onMouseEnter={() => setHover(href)}
            onMouseLeave={() => setHover("")}
            text={text}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
