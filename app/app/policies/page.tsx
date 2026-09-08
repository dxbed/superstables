"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { Modal, PageHead, Toggle, useToast } from "@/components/app/ui";
import { STABLES } from "@/lib/demo";
import { fmtUsd, useStore, type Policy } from "@/lib/store";

const num = (v: string) => (v === "" ? null : Number(v));
const str = (v: number | null) => (v == null ? "" : String(v));
const lines = (v: string) => v.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

export default function PoliciesPage() {
  const { state, dispatch } = useStore();
  const { toast, show } = useToast();
  const [editing, setEditing] = useState<Policy | null>(null);

  function save() {
    if (!editing) return;
    if (state.policies.some((p) => p.id === editing.id)) dispatch({ type: "updatePolicy", id: editing.id, patch: editing });
    else dispatch({ type: "addPolicy", policy: editing });
    setEditing(null);
    show("Policy saved");
  }
  const blank = (): Policy => ({ id: `p_${Date.now()}`, name: "", isDefault: false, active: true, perCall: 0.05, session: 2, daily: 25, allow: [], deny: [], approveAbove: 10, stables: ["USDC"], killSwitch: false });

  return (
    <>
      <PageHead title="Policies" desc="A policy is what the agent's wallet enforces on-chain: caps, allow and deny lists, approval thresholds and the kill switch. Keys inherit one policy each." actions={<button className="btn primary" onClick={() => setEditing(blank())}><Icon name="plus" size={16} /> New policy</button>} />
      <div className="panel">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Name</th><th>Status</th><th>Caps</th><th>Lists</th><th>Keys</th><th /></tr></thead>
            <tbody>
              {state.policies.map((p) => {
                const keys = state.keys.filter((k) => k.policy === p.id).length;
                return (
                  <tr key={p.id}>
                    <td><b>{p.name}</b> {p.isDefault && <span className="pill soft">Default</span>}<div className="mono" style={{ marginTop: 4 }}>{p.isDefault ? "Applied to every key without its own policy." : `${p.stables.join(", ")}`}</div></td>
                    <td>{p.killSwitch ? <span className="pill warn">Kill switch on</span> : p.active ? <span className="pill ok">Active</span> : <span className="pill">Paused</span>}</td>
                    <td className="mono">{[p.perCall != null && `${fmtUsd(p.perCall)} / call`, p.session != null && `${fmtUsd(p.session)} / session`, p.daily != null && `${fmtUsd(p.daily)} / day`].filter(Boolean).join(" · ") || "No caps"}</td>
                    <td>{p.allow.length + p.deny.length === 0 ? <span style={{ color: "var(--ink-3)" }}>Any domain</span> : `${p.allow.length} allowed, ${p.deny.length} denied`}</td>
                    <td><Icon name="key" size={14} style={{ verticalAlign: -2 }} /> {p.isDefault ? "All" : keys}</td>
                    <td className="num"><button className="btn sm" onClick={() => setEditing({ ...p })}>Edit</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">{state.policies.length} {state.policies.length === 1 ? "policy" : "policies"}</div>
      </div>

      {editing && (
        <Modal title={state.policies.some((p) => p.id === editing.id) ? "Edit policy" : "New policy"} onClose={() => setEditing(null)}>
          <label className="field"><span>Name</span><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Research agents" /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <label className="field"><span>Per call (USD)</span><input type="number" step="0.01" value={str(editing.perCall)} onChange={(e) => setEditing({ ...editing, perCall: num(e.target.value) })} /></label>
            <label className="field"><span>Per session</span><input type="number" step="0.01" value={str(editing.session)} onChange={(e) => setEditing({ ...editing, session: num(e.target.value) })} /></label>
            <label className="field"><span>Per day</span><input type="number" step="0.01" value={str(editing.daily)} onChange={(e) => setEditing({ ...editing, daily: num(e.target.value) })} /></label>
          </div>
          <label className="field"><span>Allow domains</span><textarea value={editing.allow.join("\n")} onChange={(e) => setEditing({ ...editing, allow: lines(e.target.value) })} placeholder={"api.example.com\n*.nosana.io"} /><span className="field-hint">Empty means any domain. Wildcards allowed.</span></label>
          <label className="field"><span>Deny domains</span><textarea value={editing.deny.join("\n")} onChange={(e) => setEditing({ ...editing, deny: lines(e.target.value) })} placeholder="*.unknown-broker.xyz" style={{ minHeight: 64 }} /></label>
          <label className="field"><span>Ask me above (USD)</span><input type="number" step="0.01" value={str(editing.approveAbove)} onChange={(e) => setEditing({ ...editing, approveAbove: num(e.target.value) })} /><span className="field-hint">Payments above this wait for your approval.</span></label>
          <div className="field"><span>Stablecoins the agent may spend</span>
            <div className="chiprow">{STABLES.map((s) => { const on = editing.stables.includes(s); return <button key={s} type="button" className={`pill${on ? " ok" : " soft"}`} onClick={() => setEditing({ ...editing, stables: on ? editing.stables.filter((x) => x !== s) : [...editing.stables, s] })}>{s}</button>; })}</div>
          </div>
          <div className="inline-toggle"><Toggle on={editing.active} onChange={(v) => setEditing({ ...editing, active: v })} label="Active" /> Active</div>
          <div className="inline-toggle"><Toggle on={editing.killSwitch} onChange={(v) => setEditing({ ...editing, killSwitch: v })} label="Kill switch" /> Kill switch: revoke signing for every key on this policy</div>
          <div className="foot">
            {!editing.isDefault && state.policies.some((p) => p.id === editing.id) && <button className="btn ghost danger" onClick={() => { dispatch({ type: "removePolicy", id: editing.id }); setEditing(null); }}>Delete</button>}
            <span style={{ flex: 1 }} />
            <button className="btn" onClick={() => setEditing(null)}>Cancel</button>
            <button className="btn primary" disabled={!editing.name} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {toast}
    </>
  );
}
