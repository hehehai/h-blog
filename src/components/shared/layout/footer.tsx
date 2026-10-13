import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatedLabel } from "@/components/shared/animated-label";
import { CopyButton } from "@/components/shared/copy-button";
import { SocialLinks } from "@/components/shared/social-links";
import { navMap } from "@/lib/config/nav";
import { siteConfig } from "@/lib/config/site";

export default function Footer({ currentYear }: { currentYear: number }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="eyebrow">从一个想法开始</p>
            <a
              className="footer-contact animated-link"
              href={`mailto:${siteConfig.email}`}
            >
              <AnimatedLabel text="一起做点有意思的事。" />
              <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="footer-email">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <CopyButton label="复制邮箱地址" value={siteConfig.email} />
            </div>
          </div>
          <div className="footer-navigation">
            <nav aria-label="页脚导航" id="site-navigation">
              <p className="eyebrow">浏览本站</p>
              {navMap.map(({ href, text }) => (
                <Link className="animated-link" key={href} to={href}>
                  <AnimatedLabel text={text} />
                  <ArrowUpRight aria-hidden="true" size={13} />
                </Link>
              ))}
            </nav>
            <div className="footer-links">
              <p className="eyebrow">其他地方</p>
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2019–{currentYear} Hehehai · 一块木头</span>
          <span>认真构建，保持好奇。</span>
        </div>
      </div>
    </footer>
  );
}
