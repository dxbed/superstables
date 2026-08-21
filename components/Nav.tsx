import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/content/site";

const links = [
  { href: "#why", label: "Why a router" },
  { href: "#api", label: "API" },
  { href: "#control", label: "Control plane" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#lisbon", label: "EU" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Logo />
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <ThemeToggle />
          <a className="btn" href={site.links.github} aria-label="GitHub">
            GitHub
          </a>
          <a className="btn primary" href="#early">
            Get early access
          </a>
        </div>
      </div>
    </nav>
  );
}
