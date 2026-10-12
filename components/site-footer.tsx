import Link from "next/link";

import { navItems, siteConfig } from "@/data/site";
import { formatYear } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight text-ink">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted">{siteConfig.title}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-subtle">
            {siteConfig.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-ink"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.resumePath}
                className="text-muted transition-colors hover:text-ink"
              >
                Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
          <p className="font-mono text-[0.6875rem] text-subtle">
            © {formatYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
