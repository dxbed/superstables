import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="col">
          <Logo />
          <p style={{ maxWidth: "34ch" }}>
            The payment router for AI agents. Open-source routing software; we never hold your funds.
          </p>
        </div>
        <div className="col">
          <b>Product</b>
          <Link href="/discover">Discover</Link>
          <Link href="/submit">New listing</Link>
          <Link href="/docs">API docs</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/#roadmap">Roadmap</Link>
          <Link href="/contract">Contract</Link>
          <a href={site.links.x} target="_blank" rel="noopener noreferrer">Book a demo</a>
        </div>
        <div className="col">
          <b>Company</b>
          <a href={site.links.x} target="_blank" rel="noopener noreferrer">
            X / @superstables
          </a>
        </div>
        <div className="fine">
          <span>© {new Date().getFullYear()} Superstables. Non-custodial software; we never hold customer funds.</span>
          <span className="mono">Non-custodial · Apache 2.0</span>
        </div>
      </div>
    </footer>
  );
}
