"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/components/app/Icon";

export default function SubmitForm() {
  const [endpoint, setEndpoint] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/v1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, name, contact }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div>
        <h2 style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}><Icon name="checkcircle" style={{ color: "var(--accent-text)" }} /> Received</h2>
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, marginTop: 8 }}>We probe before listing. If your endpoint answers a valid payment challenge, it will appear in the index after the next crawl.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <label className="field">
        <span>Endpoint URL</span>
        <input type="url" required placeholder="https://api.example.com/v1/data" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} autoFocus />
        <span className="field-hint">The URL that returns 402 or a payment challenge header.</span>
      </label>
      <label className="field">
        <span>Service name</span>
        <input placeholder="Example Prices API" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="field">
        <span>Contact (optional)</span>
        <input placeholder="you@example.com or @handle" value={contact} onChange={(e) => setContact(e.target.value)} />
        <span className="field-hint">Only used if we have a question about the listing.</span>
      </label>
      {state === "error" && <p className="field-error">Could not save that. Check the URL and try again.</p>}
      <button className="btn primary lg" type="submit" disabled={state === "sending" || !endpoint}>
        {state === "sending" ? "Sending" : "Submit for probing"}
      </button>
    </form>
  );
}
