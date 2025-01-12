'use client';

import { navMap } from '@/lib/config/nav';
import { AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NavItem from './nav-item';

export default function NavBar() {
  const pathname = usePathname();
  const [hover, setHover] = useState('');

  return (
    <AnimatePresence mode="wait">
      <div className="mt-5 flex items-center py-2 text-lg md:py-6">
        {navMap.map(({ href, text }) => (
          <NavItem
            active={hover === href || pathname === href}
            key={href}
            href={href}
            text={text}
            onMouseEnter={() => setHover(href)}
            onMouseLeave={() => setHover('')}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
