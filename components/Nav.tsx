"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/primitives/Logo";
import CTAButton from "@/components/primitives/CTAButton";
import { CTA_HREF, NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-hairline bg-paper/92 backdrop-blur-[2px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Link href="#top" aria-label="Odovox home" className="text-ink">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/study"
            className="hidden text-sm text-ink-soft transition-colors duration-200 hover:text-ink sm:inline"
          >
            Field study
          </a>
          <CTAButton href={CTA_HREF} className="px-5 py-2.5 text-sm">
            Watch the film
          </CTAButton>
        </div>
      </nav>
    </header>
  );
}
