"use client";

import Link from "next/link";
import { PageHead, Toggle } from "@/components/app/ui";
import { fmtUsd, useStore } from "@/lib/store";

export default function BalancePage() {
  const { state, dispatch } = useStore();
  const primary = state.wallets.find((w) => w.primary);
  const usdc = state.wallets.reduce((a, w) => a + (w.balances.USDC ?? 0), 0);
  const eurc = state.wallets.reduce((a, w) => a + (w.balances.EURC ?? 0), 0);

  return (
    <>
      <PageHead title="Balance" desc={<>Funds stay in your agent&apos;s own wallets. Superstables never holds a balance for you; this page reads what the wallets hold. {state.user.email && <>Account: {state.user.email}</>}</>} />
      <div className="panel" style={{ padding: 28, marginBottom: 20 }}>
        <span className="eyebrow plain">Total available</span>
        <div className="big-balance" style={{ marginTop: 8 }}>{fmtUsd(usdc + eurc)}<small>{usdc.toFixed(2)} USDC · {eurc.toFixed(2)} EURC</small></div>
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, marginTop: 6 }}>{primary ? `Across ${state.wallets.length} connected ${state.wallets.length === 1 ? "wallet" : "wallets"}` : "No wallet connected yet"}</p>
      </div>
      <div className="split">
        <div className="panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="sub-head" style={{ margin: 0 }}><h2>Fund a wallet</h2><span style={{ fontSize: 14, color: "var(--ink-2)" }}>Stablecoins only</span></div>
          {primary ? (
            <>
              <p style={{ fontSize: 14.5, color: "var(--ink-2)" }}>Send USDC or EURC on {primary.chains.join(", ")} to the primary wallet. Balances update as soon as the transfer confirms.</p>
              <div className="keybox"><code>{primary.address}</code><button className="btn">Copy</button></div>
              <p className="field-hint">Fiat on-ramps through partners arrive in Phase 3.</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 14.5, color: "var(--ink-2)" }}>Connect a wallet first. The router signs from it and never moves funds anywhere else.</p>
              <Link className="btn primary block" href="/app/wallets">Connect a wallet</Link>
            </>
          )}
        </div>
        <div className="panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="sub-head" style={{ margin: 0 }}><h2>Low balance alert</h2></div>
          <div className="inline-toggle"><Toggle on={state.notifs.lowBalance} onChange={(v) => dispatch({ type: "notifs", patch: { lowBalance: v } })} label="Low balance alert" /> Email me when the wallet drops below</div>
          <label className="field" style={{ maxWidth: 200 }}><span>Threshold (USD)</span><input type="number" min="0" value={state.notifs.lowBalanceBelow} onChange={(e) => dispatch({ type: "notifs", patch: { lowBalanceBelow: Number(e.target.value) } })} /></label>
          <p className="field-hint">Auto top-up from a treasury account is part of Phase 2.</p>
        </div>
      </div>
      <div className="sub-head" style={{ marginTop: 32 }}><h2>Recent transfers</h2></div>
      <div className="panel"><div className="empty" style={{ padding: 32 }}><p>No transfers yet</p></div><div className="panel-foot">0 transfers</div></div>
    </>
  );
}
