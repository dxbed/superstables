import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Code } from "@/components/app/ui";
import "../app.css";

export const metadata: Metadata = {
  alternates: { types: { "text/markdown": "https://www.superstables.com/docs.md" } },
  title: "Index API reference",
  description: "Query the Superstables index of payable services as JSON or over MCP. Free, no key, CORS open. OpenAPI spec at /openapi.json.",
};

const CURL = `curl "https://www.superstables.com/api/v1/services?rail=x402&live=true&q=compute&limit=20"`;
const RESPONSE = `{
  "generated_at": "2026-09-04T12:00:00.000Z",
  "counts": { "total": 1913, "live": 390, "dual_rail": 10 },
  "services": [
    {
      "id": "api.nosana.io",
      "name": "Nosana GPU compute",
      "description": "GPU jobs paid per second over x402.",
      "rails": ["x402"],
      "chains": ["solana"],
      "assets": ["USDC"],
      "price": { "display": "$0.001 / call", "usd": 0.001 },
      "endpoint": "https://api.nosana.io/v1/jobs",
      "live": true,
      "last_seen_live": "2026-09-04T11:40:12.000Z",
      "sources": ["x402-bazaar"]
    }
  ]
}`;
const MCP = `{
  "mcpServers": {
    "superstables": {
      "url": "https://www.superstables.com/api/mcp"
    }
  }
}`;

const Row = ({ method, path, desc }: { method: string; path: string; desc: string }) => (
  <div className="settings-row">
    <span>
      <b className="mono" style={{ fontSize: 14 }}>{method} {path}</b>
      <p>{desc}</p>
    </span>
  </div>
);

export default function ApiDocs() {
  return (
    <>
      <Nav />
      <main className="wrap" style={{ padding: "56px 0 96px", maxWidth: 860 }}>
        <span className="eyebrow plain">API reference</span>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", marginTop: 10 }}>The index, as data</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          Everything on the <Link className="link" href="/discover">Discover</Link> page is served by a public JSON API. No key, no account, CORS open, cached five minutes. Field names are a stable contract. Machine-readable spec:{" "}
          <a className="link" href="https://www.superstables.com/openapi.json">openapi.json</a>.
        </p>

        <div className="sub-head" style={{ marginTop: 40 }}><h2>Endpoints</h2></div>
        <div className="panel">
          <Row method="GET" path="/api/v1/services" desc="List services. Filters: rail (x402|mpp|acp), chain, asset, live=true, q (free text), limit (max 500), offset." />
          <Row method="GET" path="/api/v1/services/:id" desc="One service plus its last 20 liveness probes." />
          <Row method="GET" path="/api/v1/stats" desc="Census counts: total, live, probed, dual-rail, rails." />
          <Row method="POST" path="/api/v1/submit" desc='Submit a service: {"endpoint", "name", "contact"}. We probe before listing.' />
          <Row method="GET" path="/ask?query=..." desc="Natural-language questions, e.g. /ask?query=live gpu compute on solana. Returns schema.org-shaped results; streaming=true for SSE." />
        </div>

        <div className="sub-head" style={{ marginTop: 36 }}><h2>Example</h2></div>
        <Code code={CURL} />
        <div style={{ marginTop: 12 }}><Code code={RESPONSE} /></div>

        <div className="sub-head" style={{ marginTop: 36 }}><h2>MCP server</h2></div>
        <p style={{ color: "var(--ink-2)", marginBottom: 12 }}>
          Claude, Codex and other MCP clients can use the index as native tools: <code className="mono">find_services</code>, <code className="mono">get_service</code> and <code className="mono">get_stats</code>. Add it with:
        </p>
        <Code code={MCP} />

        <div className="sub-head" style={{ marginTop: 36 }}><h2>What &quot;live&quot; means</h2></div>
        <p style={{ color: "var(--ink-2)" }}>
          We GET every listed HTTP endpoint on a rolling schedule. A service is live when it answers with HTTP 402, a payment-challenge response header (x402 v2 style), or a challenge body. Non-HTTP entries (acp://) are listed but never marked dead. Probe history is kept forever and exposed per service.
        </p>
      </main>
      <Footer />
    </>
  );
}
