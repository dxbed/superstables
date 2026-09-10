import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CopyBtn } from "@/components/app/ui";
import { getService } from "@/lib/directory/query";
import "../../app.css";

export const revalidate = 300;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = await getService(id);
  if (!s) return { title: "Service not found" };
  return {
    title: `${s.name} · payable service`,
    description: `${s.name} accepts agent payments over ${s.rails.join(" and ")} on ${s.chains.join(", ") || "unknown chains"} in ${s.assets.join(", ") || "stablecoins"}. Liveness independently probed by Superstables.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const s = await getService(id);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    url: `https://www.superstables.com/s/${s.id}`,
    category: s.category ?? "AI agent payable service",
    offers: s.price.usd != null ? { "@type": "Offer", price: s.price.usd, priceCurrency: "USD" } : undefined,
  };

  return (
    <>
      <Nav />
      <main className="wrap dir-wrap" style={{ maxWidth: 860 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <p className="dir-crumb"><Link href="/discover">Discover</Link> / {s.id}</p>
        <h1 className="dir-title">{s.name}</h1>
        {s.description && <p className="dir-sub" style={{ maxWidth: "68ch", marginTop: 8 }}>{s.description}</p>}
        <p className="dir-sub" style={{ maxWidth: "68ch" }}>
          {s.name} is listed as payable by AI agents over {s.rails.map((r) => r.toUpperCase()).join(" and ")}
          {s.chains.length > 0 && <> on {s.chains.join(", ")}</>}
          {s.assets.length > 0 && <> in {s.assets.join(", ")}</>}.{" "}
          {s.live === true && s.last_seen_live && <>It answered a valid payment challenge when we last probed it at {new Date(s.last_seen_live).toUTCString()}.</>}
          {s.live === false && <>It did not respond to our last probe{s.probes[0] ? ` at ${new Date(s.probes[0].probed_at).toUTCString()}` : ""}.</>}
          {s.live === null && <>We have not probed this endpoint yet.</>}
        </p>

        <div className="panel" style={{ marginTop: 24 }}>
          <div className="settings-row"><span><b>Endpoint</b><p className="mono" style={{ wordBreak: "break-all" }}>{s.endpoint}</p></span><CopyBtn text={s.endpoint} className="btn sm" /></div>
          <div className="settings-row"><span><b>Status</b></span>{s.live === true ? <span className="pill ok">■ Live</span> : s.live === false ? <span className="pill">□ Not responding</span> : <span className="pill soft">Not yet probed</span>}</div>
          {s.price.display && <div className="settings-row"><span><b>Price</b></span><span className="mono">{s.price.display}</span></div>}
          {s.facilitator && <div className="settings-row"><span><b>Facilitator</b></span><span className="mono">{s.facilitator}</span></div>}
          <div className="settings-row"><span><b>Listed in</b><p>{s.source_urls.map((x) => x.source).join(", ")}</p></span></div>
          <div className="settings-row"><span><b>First indexed</b></span><span className="mono">{new Date(s.first_indexed).toUTCString()}</span></div>
        </div>

        <div className="sub-head" style={{ marginTop: 32 }}><h2>Probe history</h2><span style={{ fontSize: 13.5, color: "var(--ink-3)" }}>last {s.probes.length} probes</span></div>
        <div className="panel">
          {s.probes.length === 0 ? (
            <div className="empty" style={{ padding: 28 }}><p>No probes recorded yet.</p></div>
          ) : (
            <div className="tbl-wrap">
              <table className="tbl">
                <thead><tr><th>When</th><th>Result</th><th>HTTP</th><th>Method</th><th className="num">Latency</th></tr></thead>
                <tbody>
                  {s.probes.map((p) => (
                    <tr key={p.probed_at}>
                      <td className="mono" style={{ whiteSpace: "nowrap" }}>{new Date(p.probed_at).toUTCString().replace(" GMT", "")}</td>
                      <td>{p.ok ? <span className="pill ok">challenge</span> : <span className="pill">no challenge</span>}</td>
                      <td className="mono">{p.status_code ?? ""}</td>
                      <td className="mono">{p.method}</td>
                      <td className="num mono">{p.latency_ms}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p style={{ marginTop: 28, fontSize: 14, color: "var(--ink-2)" }}>
          Own this service? <Link className="link" href="/submit">Update the listing</Link> or{" "}
          <a className="link" href="https://x.com/superstables" target="_blank" rel="noopener noreferrer">report a problem</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
