"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { navItems, siteConfig } from "@/data/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Open navigation menu"
        className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
      >
        <Menu aria-hidden="true" className="size-4" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/30 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-0 top-0 border-b border-line bg-canvas px-5 pb-8 pt-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="label text-subtle">{siteConfig.name}</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3 text-lg font-medium text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteConfig.resumePath}
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink"
              >
                View Resume
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
