"use client";

import Link from "next/link";
import { useState } from "react";
import { fmtUsd, useStore } from "@/lib/store";

export default function ProfilePage() {
  const { state } = useStore();
  const [metric, setMetric] = useState<"spend" | "payments">("spend");
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d; });
  const series = days.map((d) => state.txns.filter((t) => new Date(t.at).toDateString() === d.toDateString() && t.status === "settled").reduce((a, t) => a + (metric === "spend" ? t.amount + t.fee : 1), 0));
  const max = Math.max(...series, 1e-9);
  const total = series.reduce((a, b) => a + b, 0);
  const byService = Object.entries(state.txns.reduce<Record<string, number>>((m, t) => { if (t.status === "settled") m[t.service] = (m[t.service] ?? 0) + t.amount + t.fee; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const initials = (state.user.name || state.user.email || "S").trim().slice(0, 1).toUpperCase();

  return (
    <>
      <div className="profile-head">
        <span className="avatar">{initials}</span>
        <div><h1>{state.user.name || "Your name"}</h1><p>{state.user.email || "No email set"} · {state.user.accountType === "organization" ? "Organization" : "Individual"} account</p></div>
      </div>
      <div className="panel" style={{ padding: 24 }}>
        <div className="sub-head" style={{ margin: "0 0 18px" }}>
          <h2>Usage summary <span style={{ fontWeight: 400, color: "var(--ink-3)", fontSize: 14, marginLeft: 8 }}>last 7 days</span></h2>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div className="seg"><button className={metric === "spend" ? "on" : ""} onClick={() => setMetric("spend")}>Spend</button><button className={metric === "payments" ? "on" : ""} onClick={() => setMetric("payments")}>Payments</button></div>
            <Link href="/app/activity" style={{ fontSize: 14, color: "var(--ink-2)" }}>View full activity</Link>
          </div>
        </div>
        <div className="split">
          <div>
            <div className="big-balance">{metric === "spend" ? fmtUsd(total) : total}<small>{metric === "spend" ? "spent" : "payments"}</small></div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "4px 0 18px" }}>{total === 0 ? "No prior data" : "Daily totals"}</p>
            <div className="chart">{series.map((v, i) => <div key={i} className={`bar${v === 0 ? " off" : ""}`} style={{ height: `${Math.max((v / max) * 100, 1)}%` }} />)}</div>
            <div className="chart-x">{days.map((d) => <span key={d.toISOString()}>{d.getMonth() + 1}/{d.getDate()}</span>)}</div>
          </div>
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>Top services <span style={{ fontWeight: 400, color: "var(--ink-3)", fontSize: 13 }}>by spend</span></h3>
            {byService.length === 0 ? <p style={{ color: "var(--ink-2)", fontSize: 14.5 }}>No usage in this period</p> : (
              <table className="tbl"><tbody>{byService.map(([s, v]) => <tr key={s}><td className="mono" style={{ padding: "10px 0" }}>{s}</td><td className="num" style={{ padding: "10px 0" }}>{fmtUsd(v, 3)}</td></tr>)}</tbody></table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
