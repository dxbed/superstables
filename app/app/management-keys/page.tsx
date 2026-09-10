"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { CopyBtn, Empty, Modal, PageHead } from "@/components/app/ui";
import { fmtDate, mask, useStore, type ApiKey } from "@/lib/store";

export default function ManagementKeysPage() {
  const { state, dispatch } = useStore();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [created, setCreated] = useState<string | null>(null);

  function create() {
    const full = `ss_mgmt_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    const key: ApiKey = { id: `m_${Date.now()}`, name: name || "Management key", prefix: full.slice(0, 11), createdAt: new Date().toISOString(), lastUsed: null, limit: null, spent: 0, policy: "" };
    dispatch({ type: "addMgmtKey", key });
    setCreated(full); setName("");
  }

  return (
    <>
      <PageHead title="Management keys" desc="Management keys perform administrative actions: create and revoke payment keys, edit policies and read activity. They cannot make payments." actions={<button className="btn primary" onClick={() => { setCreated(null); setModal(true); }}><Icon name="plus" size={16} /> New key</button>} />
      <div className="panel">
        {state.mgmtKeys.length === 0 ? (
          <Empty icon="lock" title="No management keys yet" desc="Create one to manage payment keys and policies from your own tooling or CI." />
        ) : (
          <div className="tbl-wrap"><table className="tbl"><thead><tr><th>Key</th><th>Created</th><th>Last used</th><th /></tr></thead><tbody>
            {state.mgmtKeys.map((k) => <tr key={k.id}><td><b>{k.name}</b><div className="mono">{mask(k.prefix)}</div></td><td>{fmtDate(k.createdAt, state.prefs.dateFormat)}</td><td>{fmtDate(k.lastUsed, state.prefs.dateFormat)}</td><td className="num"><button className="btn sm ghost danger" onClick={() => dispatch({ type: "removeMgmtKey", id: k.id })}>Revoke</button></td></tr>)}
          </tbody></table></div>
        )}
        <div className="panel-foot">{state.mgmtKeys.length} {state.mgmtKeys.length === 1 ? "key" : "keys"}</div>
      </div>
      {modal && (
        <Modal title={created ? "Key created" : "New management key"} onClose={() => setModal(false)}>
          {created ? (<><p style={{ color: "var(--ink-2)", fontSize: 14.5 }}>Copy it now. The full key is only shown once.</p><div className="keybox"><code>{created}</code><CopyBtn text={created} className="btn" /></div><div className="foot"><button className="btn primary" onClick={() => setModal(false)}>Done</button></div></>) : (<><label className="field"><span>Name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="ci-deploy" autoFocus /></label><div className="foot"><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn primary" onClick={create}>Create key</button></div></>)}
        </Modal>
      )}
    </>
  );
}
