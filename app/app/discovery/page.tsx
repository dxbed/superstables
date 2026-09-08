"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { Code, Modal, PageHead } from "@/components/app/ui";
import { SERVICES } from "@/lib/demo";

const KINDS = ["all", "data", "compute", "tool", "agent"] as const;

export default function DiscoveryPage() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [open, setOpen] = useState<(typeof SERVICES)[number] | null>(null);
  const rows = SERVICES.filter((s) => (kind === "all" || s.kind === kind) && (s.name + s.url + s.protocol).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead title="Discovery" desc="Payable services across every rail, normalised into one index with price, latency, uptime and reputation. Your agent can query this with find() or the MCP tool." />
      <div className="panel">
        <div className="panel-tools">
          <label className="search"><Icon name="search" size={16} /><input placeholder="Search services, URLs or protocols" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          <div className="seg">{KINDS.map((k) => <button key={k} className={kind === k ? "on" : ""} onClick={() => setKind(k)}>{k[0].toUpperCase() + k.slice(1)}</button>)}</div>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Service</th><th>Rail</th><th>Price</th><th>Latency</th><th>Uptime</th><th>Reputation</th><th /></tr></thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.url}>
                  <td><b>{s.name}</b> <span className="pill soft">{s.kind}</span><div className="mono">{s.url}</div></td>
                  <td>{s.protocol}<div className="mono">{s.chain} · {s.stable}</div></td>
                  <td className="mono">{s.stable} {s.price}</td>
                  <td className="mono">{s.latency}</td>
                  <td className="mono">{s.uptime}</td>
                  <td><span className={`pill${s.rep >= 85 ? " ok" : s.rep < 75 ? " warn" : ""}`}>{s.rep}</span></td>
                  <td className="num"><button className="btn sm" onClick={() => setOpen(s)}>Pay from code</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">{rows.length} of {SERVICES.length} services · sources: x402 Bazaar, Agentic Market, Circle Agent Stack, MCP registries, Virtuals ACP, DePIN providers</div>
      </div>
      {open && (
        <Modal title={open.name} onClose={() => setOpen(null)}>
          <p style={{ color: "var(--ink-2)", fontSize: 14.5 }}>The router detects the protocol at call time; this is all your agent needs.</p>
          <Code code={`const res = await pay.route("https://${open.url}", {\n  max: "${open.price.split(" ")[0]} ${open.stable}",\n});`} />
          <div className="foot"><button className="btn primary" onClick={() => setOpen(null)}>Done</button></div>
        </Modal>
      )}
    </>
  );
}
