import { useLocation } from "@tanstack/react-router";
import { navMap } from "@/lib/config/nav";
import NavItem from "./nav-item";

export default function NavBar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  return (
    <nav aria-label="主导航" className="explore-nav">
      {navMap.map(({ href, text }) => (
        <NavItem
          active={pathname === href || pathname.startsWith(`${href}/`)}
          href={href}
          key={href}
          onClick={onNavigate}
          text={text}
        />
      ))}
    </nav>
  );
}
