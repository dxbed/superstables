"use client";

import { useEffect, useState } from "react";
import { Empty, PageHead } from "@/components/app/ui";
import { QUESTIONS } from "@/content/earlyAccess";
import type { Submission } from "@/app/api/early-access/route";

export default function ApplicantsPage() {
  const [items, setItems] = useState<Submission[] | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/early-access")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setItems(d.items))
      .catch(() => setErr(true));
  }, []);

  const short = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : v ?? "");
  const csv = () => {
    if (!items) return;
    const head = ["at", "email", ...QUESTIONS.map((q) => q.id), "wish", "ref_code", "referred_by", "referrals"];
    const rows = items.map((s) => [s.at, s.email, ...QUESTIONS.map((q) => short(s.answers[q.id])), s.wish, s.refCode, s.referredBy ?? "", s.referrals].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([[head.join(","), ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "superstables-early-access.csv";
    a.click();
  };

  return (
    <>
      <PageHead title="Early access applicants" desc="Everyone who filled in the early-access form on the public site. Live data, not sample data." actions={<button className="btn" disabled={!items?.length} onClick={csv}>Download CSV</button>} />
      <div className="panel">
        {err ? (
          <Empty icon="info" title="Could not load applicants" desc="Refresh the page. If it keeps failing, the blob store token may be missing on this environment." />
        ) : items === null ? (
          <div className="empty"><p>Loading</p></div>
        ) : items.length === 0 ? (
          <Empty icon="user" title="No applications yet" desc="Share the early-access link and they will show up here." />
        ) : (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>When</th><th>Email</th>{QUESTIONS.map((q) => <th key={q.id}>{q.id[0].toUpperCase() + q.id.slice(1)}</th>)}<th>Wish</th><th>Code</th><th>Via</th><th className="num">Referrals</th></tr></thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{new Date(s.at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</td>
                    <td><b>{s.email}</b></td>
                    {QUESTIONS.map((q) => <td key={q.id} style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{short(s.answers[q.id])}</td>)}
                    <td style={{ fontSize: 13.5, color: "var(--ink-2)", maxWidth: 280 }}>{s.wish}</td><td className="mono">{s.refCode}</td><td className="mono">{s.referredBy ?? ""}</td><td className="num">{s.referrals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="panel-foot">{items ? `${items.length} ${items.length === 1 ? "application" : "applications"}` : ""}</div>
      </div>
    </>
  );
}
