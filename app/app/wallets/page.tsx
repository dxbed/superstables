"use client";

import { useState } from "react";
import Icon from "@/components/app/Icon";
import { Empty, Modal, PageHead, useToast } from "@/components/app/ui";
import { WALLET_BACKENDS } from "@/lib/demo";
import { useStore, type Wallet } from "@/lib/store";

export default function WalletsPage() {
  const { state, dispatch } = useStore();
  const { toast, show } = useToast();
  const [tab, setTab] = useState<"wallets" | "backends">("wallets");
  const [picking, setPicking] = useState<string | null>(null);
  const [name, setName] = useState("");

  function connect() {
    const b = WALLET_BACKENDS.find((w) => w.id === picking)!;
    const wallet: Wallet = { id: `w_${Date.now()}`, backend: b.name, name: name || "Agent wallet", address: "0x" + Math.random().toString(16).slice(2, 10) + "…" + Math.random().toString(16).slice(2, 6), chains: b.id === "coinbase" ? ["Base", "Solana"] : ["Base", "Solana", "Tempo"], balances: { USDC: 0, EURC: 0 }, primary: state.wallets.length === 0 };
    dispatch({ type: "addWallet", wallet });
    setPicking(null); setName(""); setTab("wallets");
    show("Wallet connected");
  }

  return (
    <>
      <PageHead title="Wallets" desc="The router signs from the agent's own smart-contract wallet and never holds funds. Connect a wallet backend, or import a wallet you already run." />
      <div className="tab-nav">
        <button className={tab === "wallets" ? "on" : ""} onClick={() => setTab("wallets")}>Connected</button>
        <button className={tab === "backends" ? "on" : ""} onClick={() => setTab("backends")}>Backends</button>
      </div>
      {tab === "wallets" ? (
        <div className="panel">
          {state.wallets.length === 0 ? (
            <Empty icon="wallet" title="No wallet connected" desc="A wallet is required before the router can settle a payment. Pick a backend to create one, or import an existing smart wallet." action={<button className="btn primary" onClick={() => setTab("backends")}>Connect a wallet</button>} />
          ) : (
            <div className="tbl-wrap">
              <table className="tbl">
                <thead><tr><th>Wallet</th><th>Backend</th><th>Chains</th><th className="num">USDC</th><th className="num">EURC</th><th /></tr></thead>
                <tbody>
                  {state.wallets.map((w) => (
                    <tr key={w.id}>
                      <td><b>{w.name}</b> {w.primary && <span className="pill soft">Primary</span>}<div className="mono">{w.address}</div></td>
                      <td>{w.backend}</td>
                      <td>{w.chains.join(", ")}</td>
                      <td className="num">{w.balances.USDC.toFixed(2)}</td>
                      <td className="num">{w.balances.EURC.toFixed(2)}</td>
                      <td className="num"><button className="btn sm ghost danger" onClick={() => dispatch({ type: "removeWallet", id: w.id })}>Disconnect</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="panel-foot">{state.wallets.length} {state.wallets.length === 1 ? "wallet" : "wallets"}</div>
        </div>
      ) : (
        <div className="row-list">
          {WALLET_BACKENDS.map((b) => {
            const n = state.wallets.filter((w) => w.backend === b.name).length;
            return (
              <div key={b.id} className="row-item">
                <span className="ic">{b.tag}</span>
                <span><b>{b.name}</b><small>{b.desc}</small></span>
                <span className="right">{n > 0 ? <span className="pill ok">{n} connected</span> : "Not configured"}<button className="btn sm" onClick={() => setPicking(b.id)}>{b.id === "import" ? "Import" : "Connect"} <Icon name="chevron" size={12} /></button></span>
              </div>
            );
          })}
        </div>
      )}
      {picking && (
        <Modal title={`Connect ${WALLET_BACKENDS.find((w) => w.id === picking)!.name}`} onClose={() => setPicking(null)}>
          <label className="field"><span>Wallet name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Agent wallet" autoFocus /></label>
          {picking === "import" ? (
            <label className="field"><span>Smart wallet address</span><input placeholder="0x…" /><span className="field-hint">We only need the address. The signing key stays with you.</span></label>
          ) : (
            <p style={{ color: "var(--ink-2)", fontSize: 14.5 }}>You will be sent to the provider to create a non-custodial smart wallet with this workspace&apos;s policy attached. In the review build this step is simulated.</p>
          )}
          <div className="foot"><button className="btn" onClick={() => setPicking(null)}>Cancel</button><button className="btn primary" onClick={connect}>Connect</button></div>
        </Modal>
      )}
      {toast}
    </>
  );
}
