"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { Code, Empty, Modal, PageHead, Toggle, useToast } from "@/components/app/ui";
import { STABLES } from "@/lib/demo";
import { fmtUsd, useStore, type Endpoint } from "@/lib/store";

export default function EarnPage() {
  const { state, dispatch } = useStore();
  const { toast, show } = useToast();
  const [modal, setModal] = useState(false);
  const [path, setPath] = useState("/v1/forecast");
  const [price, setPrice] = useState("0.01");
  const [stable, setStable] = useState("USDC");
  const earned = state.endpoints.reduce((a, e) => a + e.earned, 0);

  function add() {
    const ep: Endpoint = { id: `e_${Date.now()}`, path, price: Number(price), stable, calls: 0, earned: 0, active: true };
    dispatch({ type: "addEndpoint", endpoint: ep });
    setModal(false);
    show("Endpoint listed");
  }

  return (
    <>
      <PageHead title="Earn" badge="Beta" desc="Make your agent's service payable by any other agent. One middleware exposes an endpoint over x402, MPP, AP2 and ACP and lists it in the discovery index. Revenue settles to your primary wallet." actions={<button className="btn primary" onClick={() => setModal(true)}><Icon name="plus" size={16} /> Add endpoint</button>} />
      <div className="stat-row">
        <div className="stat-card"><span className="l">Earned, all time</span><span className="v">{fmtUsd(earned)}</span><span className="d">settles to {state.wallets.find((w) => w.primary)?.name ?? "no wallet connected"}</span></div>
        <div className="stat-card"><span className="l">Paid calls</span><span className="v">{state.endpoints.reduce((a, e) => a + e.calls, 0)}</span><span className="d">across {state.endpoints.length} endpoints</span></div>
        <div className="stat-card"><span className="l">Rails exposed</span><span className="v">4</span><span className="d">x402, MPP, AP2, ACP</span></div>
      </div>
      <div className="panel">
        {state.endpoints.length === 0 ? (
          <Empty icon="earn" title="No endpoints yet" desc="Add a path and a price. Paste the middleware into your server and other agents can start paying you." action={<button className="btn primary" onClick={() => setModal(true)}>Add endpoint</button>} />
        ) : (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Endpoint</th><th>Price</th><th className="num">Calls</th><th className="num">Earned</th><th>Live</th><th /></tr></thead>
              <tbody>
                {state.endpoints.map((e) => (
                  <tr key={e.id}>
                    <td><b className="mono" style={{ color: "var(--ink)" }}>{e.path}</b></td>
                    <td className="mono">{e.price} {e.stable} / call</td>
                    <td className="num">{e.calls}</td>
                    <td className="num">{fmtUsd(e.earned)}</td>
                    <td><Toggle on={e.active} onChange={(v) => dispatch({ type: "updateEndpoint", id: e.id, patch: { active: v } })} label="Live" /></td>
                    <td className="num"><button className="btn sm ghost danger" onClick={() => dispatch({ type: "removeEndpoint", id: e.id })}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <Modal title="Add a paid endpoint" onClose={() => setModal(false)}>
          <label className="field"><span>Path</span><input value={path} onChange={(e) => setPath(e.target.value)} autoFocus /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label className="field"><span>Price per call</span><input type="number" step="0.001" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
            <label className="field"><span>Stablecoin</span><select value={stable} onChange={(e) => setStable(e.target.value)}>{STABLES.map((s) => <option key={s}>{s}</option>)}</select></label>
          </div>
          <Code code={`app.get("${path}",\n  earn.accept({ price: "${price} ${stable}" }),\n  handler\n);`} />
          <div className="foot"><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn primary" onClick={add}>List endpoint</button></div>
        </Modal>
      )}
      {toast}
    </>
  );
}
