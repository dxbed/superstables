"use client";

import { useState } from "react";
import { PageHead, useToast } from "@/components/app/ui";
import { fmtDate, useStore } from "@/lib/store";

export default function SettingsPage() {
  const { state, dispatch } = useStore();
  const { toast, show } = useToast();
  const [ws, setWs] = useState(state.workspace);
  const dirty = JSON.stringify(ws) !== JSON.stringify(state.workspace);
  const n = (v: string) => (v === "" ? null : Number(v));

  return (
    <>
      <PageHead title="Settings" />
      <div className="form-section">
        <div><h2>General</h2></div>
        <div className="body">
          <div className="settings-row" style={{ padding: "0 0 6px", border: 0 }}><span><b style={{ display: "inline", marginRight: 12 }}>Created</b>{state.workspace.createdAt ? fmtDate(state.workspace.createdAt, state.prefs.dateFormat) : ""}</span></div>
          <div className="settings-row" style={{ padding: "0 0 6px", border: 0 }}><span><b style={{ display: "inline", marginRight: 12 }}>ID</b><span className="mono">{state.workspace.id}</span></span></div>
          <label className="field"><span>Name</span><input value={ws.name} onChange={(e) => setWs({ ...ws, name: e.target.value })} /></label>
        </div>
      </div>
      <div className="form-section">
        <div><h2>Budgets</h2><p className="desc">Cap spend across the whole workspace, on top of per-key policies. Budgets are checked before each payment.</p></div>
        <div className="body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 480 }}>
            <label className="field"><span>Daily (USD)</span><input type="number" min="0" value={ws.budgetDaily ?? ""} onChange={(e) => setWs({ ...ws, budgetDaily: n(e.target.value) })} placeholder="No limit" /></label>
            <label className="field"><span>Monthly (USD)</span><input type="number" min="0" value={ws.budgetMonthly ?? ""} onChange={(e) => setWs({ ...ws, budgetMonthly: n(e.target.value) })} placeholder="No limit" /></label>
          </div>
          <p>{ws.budgetDaily == null && ws.budgetMonthly == null ? "No limit set. This workspace can spend any amount its policies allow." : "When a budget is hit, new payments are refused until the window resets."}</p>
        </div>
      </div>
      <div className="form-section">
        <div><h2>Webhooks</h2><p className="desc">Receive an event for every settled, failed or approval-pending payment.</p></div>
        <div className="body">
          <label className="field"><span>Webhook URL</span><input value={ws.webhookUrl} onChange={(e) => setWs({ ...ws, webhookUrl: e.target.value })} placeholder="https://example.com/webhook" /></label>
          <div className="settings-row" style={{ padding: "0", border: 0 }}><span><b>Signing secret</b><p>Used to verify webhook payload signatures.</p></span><span className="mono" style={{ color: "var(--ink-3)" }}>whsec_••••••••••••</span></div>
        </div>
      </div>
      <div className="form-section">
        <div><h2>Danger zone</h2></div>
        <div className="body">
          <div className="settings-row" style={{ padding: 0, border: 0 }}><span><b>Reset review data</b><p>Clears keys, policies, wallets and sample activity in this browser.</p></span><button className="btn danger" onClick={() => { if (confirm("Reset all review data?")) dispatch({ type: "reset" }); }}>Reset</button></div>
        </div>
      </div>
      <div className="save-row" style={{ paddingTop: 24 }}>
        <button className="btn primary" disabled={!dirty} onClick={() => { dispatch({ type: "workspace", patch: ws }); show("Settings saved"); }}>Save</button>
      </div>
      {toast}
    </>
  );
}
