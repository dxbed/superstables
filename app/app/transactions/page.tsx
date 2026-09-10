"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { Empty, PageHead } from "@/components/app/ui";
import { fmtDate, useStore } from "@/lib/store";

export default function TransactionsPage() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState<"all" | "settled" | "failed" | "pending">("all");
  const rows = state.txns.filter((t) => tab === "all" || t.status === tab);

  return (
    <>
      <PageHead title="Transactions" desc="Every payment routed from this workspace, with the path taken and the on-chain receipt." actions={<><button className="btn" aria-label="Refresh"><Icon name="refresh" size={16} /></button><div className="seg"><button className="on">Past 7 days</button></div></>} />
      <div className="tab-nav">
        {(["all", "settled", "failed", "pending"] as const).map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</button>)}
      </div>
      <div className="panel">
        {rows.length === 0 ? (
          <Empty icon="list" title="No transactions found" desc="Payments appear here the moment an agent settles one with a key from this workspace." action={state.txns.length === 0 ? <button className="btn" onClick={() => dispatch({ type: "loadSample" })}>Load sample activity</button> : undefined} />
        ) : (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Date</th><th>Service</th><th>Path</th><th>Key</th><th className="num">Amount</th><th className="num">Fee</th><th className="num">Time</th><th>Status</th><th>Receipt</th></tr></thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{fmtDate(t.at, state.prefs.dateFormat)}</td>
                    <td className="mono" style={{ color: "var(--ink)" }}>{t.service}</td>
                    <td>{t.protocol}<div className="mono">{t.chain} · {t.stable}</div></td>
                    <td>{t.key}</td>
                    <td className="num mono" style={{ color: "var(--ink)" }}>{t.amount.toFixed(4)} {t.stable}</td>
                    <td className="num mono">${t.fee.toFixed(4)}</td>
                    <td className="num mono">{t.ms}ms</td>
                    <td>{t.status === "settled" ? <span className="pill ok">Settled</span> : t.status === "failed" ? <span className="pill warn">Failed</span> : <span className="pill">Pending</span>}</td>
                    <td className="mono">{t.status === "settled" ? `${t.id}…` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="panel-foot">{rows.length} {rows.length === 1 ? "transaction" : "transactions"}</div>
      </div>
    </>
  );
}
