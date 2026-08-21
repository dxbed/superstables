import Logo from "./Logo";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="col">
          <Logo />
          <p style={{ maxWidth: "34ch" }}>
            The payment router for AI agents. Neutral, non-custodial, open source. Lisbon, Portugal.
          </p>
        </div>
        <div className="col">
          <b>Product</b>
          <a href="#api">Docs</a>
          <a href="#why">Rails</a>
          <a href="#control">Control plane</a>
          <a href="#roadmap">Roadmap</a>
        </div>
        <div className="col">
          <b>Developers</b>
          <a href={site.links.github}>GitHub</a>
          <a href={site.links.npm}>npm</a>
          <a href={site.links.pypi}>PyPI</a>
          <a href={site.links.mcp}>MCP server</a>
          <a href={site.links.status}>Status &amp; metrics</a>
        </div>
        <div className="col">
          <b>Company</b>
          <a href="#lisbon">Why Lisbon</a>
          <a href={site.links.blog}>Blog</a>
          <a href={site.links.x}>X</a>
          <a href={site.links.contact}>Contact</a>
        </div>
        <div className="fine">
          <span>© {new Date().getFullYear()} Superstables. Non-custodial software; we never hold customer funds.</span>
          <span className="mono">MiCA-aligned · Apache 2.0 · no token</span>
        </div>
      </div>
    </footer>
  );
}
