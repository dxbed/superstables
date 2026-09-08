"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function GateForm({ next }: { next: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      setState("error");
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (state === "error") setState("idle");
          }}
          autoFocus
          autoComplete="current-password"
          aria-invalid={state === "error"}
        />
      </label>
      {state === "error" && <p className="field-error">That password is not right. Check the message you were sent.</p>}
      <button className="btn primary lg block" type="submit" disabled={state === "sending" || !password}>
        {state === "sending" ? "Checking" : "Continue"}
      </button>
    </form>
  );
}
