import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "../app.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: "The Superstables index is free: web directory, JSON API, MCP server and natural-language endpoint. No key, no account, no paid tiers.",
  alternates: { types: { "text/markdown": "https://www.superstables.com/pricing.md" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Superstables index",
  description: "Liveness-probed index of services AI agents can pay with stablecoins.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

export default function Pricing() {
  return (
    <>
      <Nav />
      <main className="wrap" style={{ padding: "56px 0 96px", maxWidth: 760 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <span className="eyebrow plain">Pricing</span>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", marginTop: 10 }}>Free, all of it.</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          The index is free for humans and for agents: the <Link className="link" href="/discover">directory</Link>, the{" "}
          <Link className="link" href="/docs">JSON API</Link>, the MCP server and the natural-language endpoint, with no key,
          no account and no paid tiers. Listing a service is free too; the only requirement is that your endpoint answers a
          payment challenge when we probe it.
        </p>
        <div className="panel" style={{ marginTop: 28 }}>
          <div className="settings-row"><span><b>Web directory</b><p>Browse and filter every indexed service.</p></span><span className="pill ok">Free</span></div>
          <div className="settings-row"><span><b>JSON API</b><p>Full index, CORS open, soft limit of 300 requests per minute.</p></span><span className="pill ok">Free</span></div>
          <div className="settings-row"><span><b>MCP server</b><p>find_services, get_service and get_stats as native agent tools.</p></span><span className="pill ok">Free</span></div>
          <div className="settings-row"><span><b>Listing your service</b><p>Submitted endpoints are probed before they appear.</p></span><span className="pill ok">Free</span></div>
        </div>
        <p style={{ marginTop: 24, fontSize: 14, color: "var(--ink-2)" }}>
          If paid tiers ever exist, <a className="link" href="https://www.superstables.com/pricing.md">pricing.md</a> changes first. Questions:{" "}
          <a className="link" href="https://x.com/superstables" target="_blank" rel="noopener noreferrer">@superstables</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
