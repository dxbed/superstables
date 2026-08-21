"use client";

import { useState, type FormEvent } from "react";

type State = "idle" | "sending" | "sent" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (!input?.checkValidity()) {
      input?.focus();
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <form className={`cta-form${state === "sent" ? " sent" : ""}`} onSubmit={onSubmit} noValidate>
      <div className="row">
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          aria-label="Email address"
          aria-invalid={state === "error"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          style={state === "error" ? { borderColor: "var(--down)" } : undefined}
        />
        <button className="btn primary lg" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Request access"}
        </button>
      </div>
      <p className="hint">
        {state === "error"
          ? "That doesn't look like an email address — check it and try again."
          : "No token, no airdrop, no spam. We'll write when the router is ready for you."}
      </p>
      <p className="ok">Thanks — you&apos;re on the list. We&apos;ll be in touch before the Phase 1 release.</p>
    </form>
  );
}
