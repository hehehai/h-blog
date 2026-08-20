"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navMap } from "@/lib/config/nav";
import NavItem from "./nav-item";

export default function NavBar() {
  const pathname = usePathname();
  const [hover, setHover] = useState("");

  return (
    <AnimatePresence mode="wait">
      <div className="mt-5 flex items-center py-2 text-lg md:py-6">
        {navMap.map(({ href, text }) => (
          <NavItem
            active={hover === href || pathname === href}
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
