"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/docs", label: "API" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/contract", label: "Contract" },
  { href: "/treasury", label: "Treasury" },
  { href: "/discover", label: "Discover services" },
  { href: "/submit", label: "New listing" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="burger-wrap">
      <button
        type="button"
        className="btn theme-toggle burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 16 16" width="16" height="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="16" height="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M2 4.5h12M2 8h12M2 11.5h12" />
          </svg>
        )}
      </button>
      {open && (
        <div className="burger-panel">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
