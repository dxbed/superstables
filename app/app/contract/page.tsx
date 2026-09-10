"use client";

import { useEffect, useState } from "react";
import { PageHead } from "@/components/app/ui";

const ADDRESS = /^0x[a-fA-F0-9]{40}$/;

export default function ContractAdminPage() {
  const [current, setCurrent] = useState<string | null | undefined>(undefined);
  const [value, setValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "saving" | "saved" | "error"; msg?: string }>({ kind: "idle" });

  useEffect(() => {
    fetch("/api/admin/contract")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setCurrent(d.value))
      .catch(() => setCurrent(null));
  }, []);

  const trimmed = value.trim();
  const valid = ADDRESS.test(trimmed);
  const confirmed = trimmed !== "" && trimmed === confirm.trim();

  const save = async () => {
    setState({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setCurrent(data.value);
      setValue("");
      setConfirm("");
      setState({ kind: "saved" });
    } catch (e) {
      setState({ kind: "error", msg: e instanceof Error ? e.message : "Save failed" });
    }
  };

  return (
    <>
      <PageHead title="Token contract" desc="Sets the contract address shown on the public /contract page. It goes live within seconds of saving." />
      <div className="panel">
        <div className="settings-row">
          <span>
            <b>Currently published</b>
            {current === undefined ? <p>Loading</p> : current ? <p className="mono" style={{ wordBreak: "break-all" }}>{current}</p> : <p>Nothing yet. The public page says &quot;not published yet&quot;.</p>}
          </span>
        </div>
        <div className="settings-row" style={{ display: "block" }}>
          <b>New contract address</b>
          <p style={{ margin: "4px 0 10px", color: "var(--ink-2)", fontSize: 14 }}>
            Paste the address, then paste it again to confirm. People will send money based on this value, so copy it
            straight from the deployment, never retype it.
          </p>
          <input
            className="mono"
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", marginBottom: 8, background: "var(--panel-2, transparent)", border: "1px solid var(--line-2)", borderRadius: 3, color: "var(--ink)", fontSize: 14 }}
            placeholder="0x…"
            value={value}
            onChange={(e) => { setValue(e.target.value); setState({ kind: "idle" }); }}
            aria-label="New contract address"
          />
          <input
            className="mono"
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", marginBottom: 12, background: "var(--panel-2, transparent)", border: "1px solid var(--line-2)", borderRadius: 3, color: "var(--ink)", fontSize: 14 }}
            placeholder="Paste it again to confirm"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setState({ kind: "idle" }); }}
            aria-label="Confirm contract address"
          />
          {trimmed !== "" && !valid && <p style={{ color: "var(--ink-2)", fontSize: 13.5, margin: "0 0 10px" }}>Not a valid address yet: it must be 0x followed by 40 hex characters.</p>}
          {valid && !confirmed && confirm.trim() !== "" && <p style={{ color: "var(--ink-2)", fontSize: 13.5, margin: "0 0 10px" }}>The two fields do not match.</p>}
          <button className="btn primary" disabled={!valid || !confirmed || state.kind === "saving"} onClick={save}>
            {state.kind === "saving" ? "Publishing…" : current ? "Replace the published address" : "Publish to /contract"}
          </button>
          {state.kind === "saved" && <span style={{ marginLeft: 12, fontSize: 14 }}>Published. Check <a className="link" href="/contract" target="_blank" rel="noreferrer">superstables.com/contract</a>.</span>}
          {state.kind === "error" && <span style={{ marginLeft: 12, fontSize: 14, color: "var(--ink-2)" }}>{state.msg}</span>}
        </div>
      </div>
    </>
  );
}
