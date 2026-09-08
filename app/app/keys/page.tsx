"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { CopyBtn, Empty, Modal, PageHead, useToast } from "@/components/app/ui";
import { fmtDate, fmtUsd, mask, newKeyString, useStore, type ApiKey } from "@/lib/store";

export default function KeysPage() {
  const { state, dispatch } = useStore();
  const { toast, show } = useToast();
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [policy, setPolicy] = useState(state.policies[0]?.id ?? "");
  const [created, setCreated] = useState<string | null>(null);

  const rows = state.keys.filter((k) => k.name.toLowerCase().includes(q.toLowerCase()) || k.prefix.includes(q));

  function create() {
    const full = newKeyString();
    const key: ApiKey = { id: `k_${Date.now()}`, name: name || "Untitled key", prefix: full.slice(0, 11), createdAt: new Date().toISOString(), lastUsed: null, limit: limit ? Number(limit) : null, spent: 0, policy };
    dispatch({ type: "addKey", key });
    setCreated(full);
    setName(""); setLimit("");
  }

  return (
    <>
      <PageHead title="API keys" desc="Keys identify an agent to the router. Each key inherits a policy; spend is capped by the policy and by the key's own limit." actions={<button className="btn primary" onClick={() => { setCreated(null); setModal(true); }}><Icon name="plus" size={16} /> New key</button>} />
      <div className="panel">
        <div className="panel-tools">
          <label className="search"><Icon name="search" size={16} /><input placeholder="Search by name or paste a key" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        </div>
        {rows.length === 0 ? (
          <Empty icon="key" title="No keys match" desc="Create a key and give it to the agent that should be able to pay." />
        ) : (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Key</th><th>Policy</th><th>Last used</th><th className="num">Spent</th><th className="num">Limit</th><th /></tr></thead>
              <tbody>
                {rows.map((k) => (
                  <tr key={k.id}>
                    <td><b>{k.name}</b><div className="mono">{mask(k.prefix)}</div></td>
                    <td>{state.policies.find((p) => p.id === k.policy)?.name ?? <span className="pill">No policy</span>}</td>
                    <td>{fmtDate(k.lastUsed, state.prefs.dateFormat)}</td>
                    <td className="num">{fmtUsd(k.spent, 3)}</td>
                    <td className="num">{k.limit == null ? "unlimited" : fmtUsd(k.limit)}</td>
                    <td className="num"><button className="btn sm ghost danger" onClick={() => { dispatch({ type: "removeKey", id: k.id }); show("Key revoked"); }}>Revoke</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="panel-foot">{state.keys.length} {state.keys.length === 1 ? "key" : "keys"}</div>
      </div>
      {modal && (
        <Modal title={created ? "Key created" : "New API key"} onClose={() => setModal(false)}>
          {created ? (
            <>
              <p style={{ color: "var(--ink-2)", fontSize: 14.5 }}>Copy it now. For safety we only show the full key once.</p>
              <div className="keybox"><code>{created}</code><CopyBtn text={created} className="btn" /></div>
              <div className="foot"><button className="btn primary" onClick={() => setModal(false)}>Done</button></div>
            </>
          ) : (
            <>
              <label className="field"><span>Name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="research-bot" autoFocus /></label>
              <label className="field"><span>Policy</span>
                <select value={policy} onChange={(e) => setPolicy(e.target.value)}>{state.policies.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
              </label>
              <label className="field"><span>Key limit (USD, optional)</span><input type="number" min="0" step="0.01" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="unlimited" /><span className="field-hint">Total the key may ever spend, on top of the policy caps.</span></label>
              <div className="foot"><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn primary" onClick={create}>Create key</button></div>
            </>
          )}
        </Modal>
      )}
      {toast}
    </>
  );
}
