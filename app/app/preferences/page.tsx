"use client";

import { PageHead, Toggle } from "@/components/app/ui";
import { useStore } from "@/lib/store";

export default function PreferencesPage() {
  const { state, dispatch } = useStore();
  const p = state.prefs;

  return (
    <>
      <PageHead title="Preferences" />
      <div className="panel">
        <div className="settings-row"><span><b>User</b><p>Manage your login, security settings or delete your account.</p></span><button className="btn">Manage</button></div>
        <div className="settings-row"><span><b>Account type</b><p>{state.user.accountType === "organization" ? "Organization: shared policies, roles and one treasury." : "Individual: your own agents, your own wallet."}</p></span>
          <div className="seg"><button className={state.user.accountType === "individual" ? "on" : ""} onClick={() => dispatch({ type: "user", patch: { accountType: "individual" } })}>Individual</button><button className={state.user.accountType === "organization" ? "on" : ""} onClick={() => dispatch({ type: "user", patch: { accountType: "organization" } })}>Organization</button></div>
        </div>
        <div className="settings-row"><span><b>Name</b><p>Shown in the account menu and on receipts you issue.</p></span><input className="field" style={{ height: 40, padding: "0 12px", border: "1px solid var(--line-2)", borderRadius: 4, background: "var(--bg)", color: "var(--ink)", width: 240 }} value={state.user.name} onChange={(e) => dispatch({ type: "user", patch: { name: e.target.value } })} placeholder="Your name" /></div>
        <div className="settings-row"><span><b>Date format</b><p>How dates appear in transactions and activity.</p></span>
          <select className="field" style={{ height: 40, padding: "0 12px", border: "1px solid var(--line-2)", borderRadius: 4, background: "var(--bg)", color: "var(--ink)" }} value={p.dateFormat} onChange={(e) => dispatch({ type: "prefs", patch: { dateFormat: e.target.value as typeof p.dateFormat } })}><option value="default">Default</option><option value="iso">ISO 8601</option><option value="us">US</option></select>
        </div>
        <div className="settings-row"><span><b>Analytics cookies</b><p>Allow analytics cookies to help us improve the product.</p></span><Toggle on={p.analytics} onChange={(v) => dispatch({ type: "prefs", patch: { analytics: v } })} label="Analytics cookies" /></div>
        <div className="settings-row"><span><b>Browser notifications</b><p>Notify me in the browser when a payment needs approval.</p></span><Toggle on={p.browserNotifs} onChange={(v) => dispatch({ type: "prefs", patch: { browserNotifs: v } })} label="Browser notifications" /></div>
      </div>
      <div className="sub-head" style={{ marginTop: 32 }}><h2>Attestations</h2></div>
      <div className="panel">
        <div className="settings-row"><span><b>Accountable principal</b><p>Confirms that a person or company is responsible for the agents using this account. Required for the agent passport in Phase 3.</p></span><span className="pill">Not yet verified</span></div>
        <div className="settings-row"><span><b>Terms accepted</b><p>Terms of Service, Privacy Policy and the Non-custodial Software Notice.</p></span><span className={`pill${state.user.consent ? " ok" : ""}`}>{state.user.consent ? "Accepted" : "Pending"}</span></div>
      </div>
    </>
  );
}
