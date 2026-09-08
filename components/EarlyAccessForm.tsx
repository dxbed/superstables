"use client";

import { useEffect, useState, type FormEvent } from "react";
import SkipTheLine, { type Line } from "@/components/SkipTheLine";
import Icon from "@/components/app/Icon";
import { FREE_TEXT, QUESTIONS } from "@/content/earlyAccess";
import { track } from "@/components/Analytics";

type Answers = Record<string, string | string[]>;
const TOTAL = QUESTIONS.length + 2; // email + questions + free text

export default function EarlyAccessForm() {
  const [step, setStep] = useState(0); // 0 = email, 1..n = questions, n+1 = free text
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [wish, setWish] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [emailErr, setEmailErr] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const [line, setLine] = useState<Line | null>(null);

  // A returning applicant sees their place in line instead of the form. A ?ref= in the URL credits the referrer.
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("ref");
    const saved = (() => { try { return JSON.parse(localStorage.getItem("ss_ea") || "null"); } catch { return null; } })();
    const t = window.setTimeout(() => {
      if (r) setRef(r.toLowerCase());
      if (saved?.email && saved?.code) {
        setEmail(saved.email);
        fetch(`/api/early-access?code=${encodeURIComponent(saved.code)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((l: Line | null) => { if (l) { setLine(l); setState("done"); } })
          .catch(() => {});
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const q = step >= 1 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;
  const answered = q ? (q.type === "single" ? typeof answers[q.id] === "string" : Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length > 0) : true;

  function onEmail(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr(true);
      return;
    }
    track("early_access_start");
    setStep(1);
  }

  function pick(id: string, opt: string, type: "single" | "multi") {
    if (type === "single") {
      setAnswers({ ...answers, [id]: opt });
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      const cur = (answers[id] as string[]) ?? [];
      setAnswers({ ...answers, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] });
    }
  }

  async function submit() {
    setState("sending");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers, wish, ref }),
      });
      if (res.ok) {
        const data = (await res.json()) as Line & { ok: boolean };
        setLine({ code: data.code, position: data.position, referrals: data.referrals, total: data.total });
        try { localStorage.setItem("ss_ea", JSON.stringify({ email, code: data.code })); } catch { /* ignore */ }
        track("early_access_submit", { role: String(answers.role ?? ""), stage: String(answers.stage ?? ""), referred: Boolean(ref) });
      }
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    if (line) {
      return (
        <SkipTheLine
          email={email}
          line={line}
          onReset={() => {
            try { localStorage.removeItem("ss_ea"); } catch { /* ignore */ }
            setLine(null); setEmail(""); setAnswers({}); setWish(""); setStep(0); setState("idle");
          }}
        />
      );
    }
    return (
      <div className="ea-card">
        <h1><Icon name="checkcircle" className="ok" /> You&apos;re on the list</h1>
        <p className="sub">Thanks. We&apos;re onboarding in small batches and will write to <b>{email}</b> when your turn comes.</p>
      </div>
    );
  }

  return (
    <>
      <div className="ea-card">
        {step === 0 && (
          <form onSubmit={onEmail} className="ea-body">
            <h1>Get early access</h1>
            <p className="sub">Tell us where to reach you, then five quick questions so we onboard the right people first.</p>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr(false); }} placeholder="you@company.com" autoComplete="email" autoFocus aria-invalid={emailErr} />
              {emailErr && <span className="field-error">That doesn&apos;t look like an email address.</span>}
            </label>
            <button className="btn primary lg" type="submit">Continue</button>
          </form>
        )}

        {q && (
          <div className="ea-body">
            <span className="eyebrow plain">Question {step} of {QUESTIONS.length}</span>
            <h1>{q.title}</h1>
            {q.hint && <p className="sub">{q.hint}</p>}
            <div className="ea-options">
              {q.options.map((opt) => {
                const on = q.type === "single" ? answers[q.id] === opt : ((answers[q.id] as string[]) ?? []).includes(opt);
                return (
                  <button key={opt} type="button" className={`ea-opt${on ? " on" : ""}`} onClick={() => pick(q.id, opt, q.type)} aria-pressed={on}>
                    <span className={q.type === "multi" ? "box" : "dot"} />
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === QUESTIONS.length + 1 && (
          <div className="ea-body">
            <span className="eyebrow plain">Last one</span>
            <h1>{FREE_TEXT.title}</h1>
            <p className="sub">{FREE_TEXT.hint}</p>
            <label className="field">
              <textarea value={wish} onChange={(e) => setWish(e.target.value)} placeholder="For example: pay a GPU provider per minute from a Claude agent without me topping up a card." style={{ fontFamily: "var(--body)", fontSize: 15 }} />
            </label>
            {state === "error" && <p className="field-error">Something went wrong saving your answers. Try again in a moment.</p>}
          </div>
        )}
      </div>

      <div className="ea-actions">
        {step > 0 ? (
          <button className="btn ghost" onClick={() => setStep(step - 1)}><Icon name="back" size={16} /> Back</button>
        ) : <span />}
        {q && q.type === "multi" && (
          <button className="btn primary lg" disabled={!answered} onClick={() => setStep(step + 1)}>Continue</button>
        )}
        {step === QUESTIONS.length + 1 && (
          <button className="btn primary lg" disabled={state === "sending"} onClick={submit}>{state === "sending" ? "Sending" : "Request access"}</button>
        )}
      </div>
      <div className="ob-dots" aria-hidden="true">
        {Array.from({ length: TOTAL }).map((_, i) => <i key={i} className={i < step ? "done" : i === step ? "on" : ""} />)}
      </div>
    </>
  );
}
