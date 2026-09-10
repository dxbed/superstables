"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import Icon, { type IconName } from "./Icon";
import { useStore } from "@/lib/store";

const WORKSPACE: { href: string; label: string; icon: IconName; tag?: string }[] = [
  { href: "/app", label: "Overview", icon: "grid" },
  { href: "/app/keys", label: "API keys", icon: "key" },
  { href: "/app/policies", label: "Policies", icon: "shield" },
  { href: "/app/wallets", label: "Wallets", icon: "wallet" },
  { href: "/app/routing", label: "Routing", icon: "route" },
  { href: "/app/discovery", label: "Discovery", icon: "search" },
  { href: "/app/earn", label: "Earn", icon: "earn", tag: "Beta" },
  { href: "/app/settings", label: "Settings", icon: "settings" },
];
const ACCOUNT: { href: string; label: string; icon: IconName }[] = [
  { href: "/app/profile", label: "Profile", icon: "user" },
  { href: "/app/activity", label: "Activity", icon: "chart" },
  { href: "/app/transactions", label: "Transactions", icon: "list" },
  { href: "/app/balance", label: "Balance", icon: "card" },
  { href: "/app/management-keys", label: "Management keys", icon: "lock" },
  { href: "/app/notifications", label: "Notifications", icon: "bell" },
  { href: "/app/privacy", label: "Privacy", icon: "privacy" },
  { href: "/app/preferences", label: "Preferences", icon: "sliders" },
  { href: "/app/applicants", label: "Early access", icon: "flask" },
];

function setTheme(t: "light" | "dark" | "system") {
  if (t === "system") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("ss-theme");
  } else {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("ss-theme", t);
  }
}

export default function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { state, dispatch } = useStore();
  const [open, setOpen] = useState(false);
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("system");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = localStorage.getItem("ss-theme");
    const id = window.setTimeout(() => setThemeState(t === "light" || t === "dark" ? t : "system"), 0);
    return () => window.clearTimeout(id);
  }, []);
  useEffect(() => {
    if (!open) return;
    const f = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("mousedown", f);
    return () => window.removeEventListener("mousedown", f);
  }, [open]);

  const initials = (state.user.name || state.user.email || "S").trim().slice(0, 1).toUpperCase();
  const isOn = (href: string) => (href === "/app" ? path === "/app" : path.startsWith(href));

  return (
    <div className="dash">
      <header className="topbar">
        <Logo />
        <div className="search" role="search">
          <Icon name="search" size={16} />
          <span>Search</span>
          <kbd>⌘K</kbd>
        </div>
        <nav className="links">
          <Link href="/app/discovery" className="hide-sm">Services</Link>
          <div ref={menuRef} style={{ position: "relative" }}>
            <button className="account-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
              <span className="avatar">{initials}</span>
              {state.user.accountType === "organization" ? "Organization" : "Personal"}
              <Icon name="chevron" size={14} style={{ transform: open ? "rotate(-90deg)" : "rotate(90deg)" }} />
            </button>
            {open && (
              <div className="menu" role="menu">
                {[
                  ["/app/profile", "Profile", "user"],
                  ["/app/activity", "Activity", "chart"],
                  ["/app/transactions", "Transactions", "list"],
                  ["/app/balance", "Balance", "card"],
                  ["/app/preferences", "Preferences", "settings"],
                ].map(([h, l, i]) => (
                  <Link key={h} href={h} onClick={() => setOpen(false)}>
                    <Icon name={i as IconName} size={16} /> {l}
                  </Link>
                ))}
                <div className="sep" />
                <button
                  className="danger"
                  onClick={() => {
                    dispatch({ type: "patch", patch: { onboarded: false } });
                    router.push("/onboarding");
                  }}
                >
                  <Icon name="logout" size={16} /> Sign out
                </button>
                <div className="theme-row">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button
                      key={t}
                      className={theme === t ? "on" : ""}
                      aria-label={`${t} theme`}
                      onClick={() => {
                        setTheme(t);
                        setThemeState(t);
                      }}
                    >
                      <Icon name={t === "light" ? "sun" : t === "dark" ? "moon" : "monitor"} size={16} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <div className="dash-body">
        <aside className="sidebar">
          <div className="ws-switch">
            {state.workspace.name}
            <Icon name="updown" />
          </div>
          {WORKSPACE.map((l) => (
            <Link key={l.href} href={l.href} className={`side-link${isOn(l.href) ? " on" : ""}`}>
              <Icon name={l.icon} /> {l.label} {l.tag && <span className="tag">{l.tag}</span>}
            </Link>
          ))}
          <div className="group">Account</div>
          {ACCOUNT.map((l) => (
            <Link key={l.href} href={l.href} className={`side-link${isOn(l.href) ? " on" : ""}`}>
              <Icon name={l.icon} /> {l.label}
            </Link>
          ))}
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
