"use client";

import { useState } from "react";
import { PageHead } from "@/components/app/ui";
import { fmtUsd, useStore } from "@/lib/store";

type Grp = [string, { n: number; v: number }][];
const Card = ({ l, v, d }: { l: string; v: string; d: string }) => <div className="stat-card"><span className="l">{l}</span><span className="v">{v}</span><span className="d">{d}</span></div>;
const Tbl = ({ rows, head, total }: { rows: Grp; head: string; total: number }) => (
  <div className="panel"><div className="tbl-wrap"><table className="tbl"><thead><tr><th>{head}</th><th className="num">Payments</th><th className="num">Spend</th><th className="num">Share</th></tr></thead><tbody>
    {rows.length === 0 ? <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--ink-2)", padding: 40 }}>No data in this window</td></tr> : rows.map(([k, r]) => <tr key={k}><td><b>{k}</b></td><td className="num">{r.n}</td><td className="num">{fmtUsd(r.v, 3)}</td><td className="num">{total ? ((r.v / total) * 100).toFixed(1) : "0.0"}%</td></tr>)}
  </tbody></table></div></div>
);

export default function ActivityPage() {
  const { state } = useStore();
  const [tab, setTab] = useState<"overview" | "rails" | "keys">("overview");
  const ok = state.txns.filter((t) => t.status === "settled");
  const spend = ok.reduce((a, t) => a + t.amount + t.fee, 0);
  const fees = ok.reduce((a, t) => a + t.fee, 0);
  const avgMs = ok.length ? Math.round(ok.reduce((a, t) => a + t.ms, 0) / ok.length) : 0;
  const group = (f: (t: (typeof ok)[number]) => string) => Object.entries(ok.reduce<Record<string, { n: number; v: number }>>((m, t) => { const k = f(t); m[k] = { n: (m[k]?.n ?? 0) + 1, v: (m[k]?.v ?? 0) + t.amount + t.fee }; return m; }, {})).sort((a, b) => b[1].v - a[1].v);

  return (
    <>
      <PageHead title="Activity" desc="Your usage across rails, chains and keys on Superstables." actions={<div className="seg"><button className="on">Past month</button></div>} />
      <div className="tab-nav">
        {(["overview", "rails", "keys"] as const).map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t === "rails" ? "By rail" : t === "keys" ? "By key" : "Overview"}</button>)}
      </div>
      {tab === "overview" && (
        <>
          <div className="stat-row five">
            <Card l="Total spend" v={fmtUsd(spend)} d={ok.length ? "settled payments" : "No prior data"} />
            <Card l="Payments" v={String(state.txns.length)} d={`${state.txns.filter((t) => t.status === "failed").length} failed`} />
            <Card l="Routing fees" v={fmtUsd(fees, 4)} d={spend ? `${((fees / spend) * 100).toFixed(2)}% of spend` : "No prior data"} />
            <Card l="Avg settlement" v={avgMs ? `${avgMs}ms` : "n/a"} d="detect to receipt" />
            <Card l="Rails used" v={String(new Set(ok.map((t) => t.protocol)).size)} d={`${new Set(ok.map((t) => t.chain)).size} chains`} />
          </div>
          <div className="split">
            <Tbl head="Top services" rows={group((t) => t.service).slice(0, 5)} total={spend} />
            <Tbl head="By stablecoin" rows={group((t) => t.stable)} total={spend} />
          </div>
        </>
      )}
      {tab === "rails" && <div className="split"><Tbl head="Protocol" rows={group((t) => t.protocol)} total={spend} /><Tbl head="Chain" rows={group((t) => t.chain)} total={spend} /></div>}
      {tab === "keys" && <Tbl head="API key" rows={group((t) => t.key)} total={spend} />}
    </>
  );
}
