"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { PageHead, Toggle, useToast } from "@/components/app/ui";
import { CHAINS, FACILITATORS, PROTOCOLS, STABLES } from "@/lib/demo";
import { useStore, type Routing } from "@/lib/store";

export default function RoutingPage() {
  const { state, dispatch } = useStore();
  const { toast, show } = useToast();
  const [r, setR] = useState<Routing>(state.routing);
  const dirty = JSON.stringify(r) !== JSON.stringify(state.routing);
  const flip = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <>
      <PageHead title="Routing" desc="How the router picks a path when more than one facilitator, chain or stablecoin can settle a payment. Individual calls can override these defaults." />
      <div className="form-section">
        <div><h2><Icon name="route" /> Path ranking</h2><p className="desc">Choose how candidate paths are sorted after the policy filters them.</p></div>
        <div className="body">
          <div className="seg">
            {(["cheapest", "fastest", "balanced"] as const).map((s) => <button key={s} className={r.sort === s ? "on" : ""} onClick={() => setR({ ...r, sort: s })}>{s[0].toUpperCase() + s.slice(1)}</button>)}
          </div>
          <p>{r.sort === "cheapest" ? "Lowest total cost (amount plus facilitator fee and gas) wins. Default." : r.sort === "fastest" ? "Lowest observed settlement time wins, even if it costs more." : "Balances fee and latency, and weights facilitator uptime over the last hour."}</p>
          <label className="field" style={{ maxWidth: 280 }}><span>Maximum routing fee (bps)</span><input type="number" min="0" value={r.maxFeeBps} onChange={(e) => setR({ ...r, maxFeeBps: Number(e.target.value) })} /><span className="field-hint">Paths whose fee exceeds this share of the amount are skipped.</span></label>
          <div className="inline-toggle"><Toggle on={r.failover} onChange={(v) => setR({ ...r, failover: v })} label="Failover" /> Move the payment to the next path if a rail fails mid-payment</div>
        </div>
      </div>
      <div className="form-section">
        <div><h2><Icon name="shuffle" /> Rails and chains</h2><p className="desc">Restrict which protocols and chains the router may use for this workspace.</p></div>
        <div className="body">
          <div className="field"><span>Protocols</span><div className="chiprow">{PROTOCOLS.map((p) => <button key={p} type="button" className={`pill${r.allowedRails.includes(p) ? " ok" : " soft"}`} onClick={() => setR({ ...r, allowedRails: flip(r.allowedRails, p) })}>{p}</button>)}</div></div>
          <div className="field"><span>Chains</span><div className="chiprow">{CHAINS.map((c) => <button key={c} type="button" className={`pill${r.allowedChains.includes(c) ? " ok" : " soft"}`} onClick={() => setR({ ...r, allowedChains: flip(r.allowedChains, c) })}>{c}</button>)}</div></div>
          <label className="field" style={{ maxWidth: 280 }}><span>Preferred stablecoin</span><select value={r.preferredStable} onChange={(e) => setR({ ...r, preferredStable: e.target.value })}>{STABLES.map((s) => <option key={s}>{s}</option>)}</select><span className="field-hint">Used when the endpoint accepts more than one. Auto-conversion arrives in Phase 2.</span></label>
        </div>
      </div>
      <div className="form-section">
        <div><h2><Icon name="zap" /> Facilitators</h2><p className="desc">Live facilitators the router can quote. Health is sampled every minute.</p></div>
        <div className="row-list">
          {FACILITATORS.map((f) => (
            <div key={f.name} className="row-item">
              <span className="ic">{f.protocol.slice(0, 2).toUpperCase()}</span>
              <span><b>{f.name}</b><small>{f.protocol} · {f.chains.join(", ")} · fee ${f.fee}</small></span>
              <span className="right">{f.health === "ok" ? <span className="pill ok">Healthy</span> : <span className="pill warn">Degraded</span>}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="save-row" style={{ paddingTop: 24 }}>
        <button className="btn primary" disabled={!dirty} onClick={() => { dispatch({ type: "routing", patch: r }); show("Routing saved"); }}>Save</button>
      </div>
      {toast}
    </>
  );
}
