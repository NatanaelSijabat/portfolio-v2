import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, siteConfig } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-2.5 font-display text-[1.0625rem] tracking-tight text-ink"
        >
          <span className="size-1.5 translate-y-[-2px] rounded-full bg-accent" aria-hidden="true" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label text-subtle transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={siteConfig.resumePath}
            className="label hidden text-subtle underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent sm:inline"
          >
            Resume
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
