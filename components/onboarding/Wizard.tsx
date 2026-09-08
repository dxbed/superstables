"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { LogoMark } from "@/components/Logo";
import Icon from "@/components/app/Icon";
import { Code, CopyBtn } from "@/components/app/ui";
import { SOURCES, WALLET_BACKENDS } from "@/lib/demo";
import { newKeyString, useStore, type Wallet } from "@/lib/store";

type Step = "signin" | "consent" | "welcome" | "workspace" | "wallet" | "source" | "done";
const DOTS: Step[] = ["welcome", "workspace", "wallet", "source", "done"];

export default function Wizard() {
  const router = useRouter();
  const { state, dispatch } = useStore();
  const [step, setStep] = useState<Step>("signin");
  const [email, setEmail] = useState(state.user.email);
  const [consent, setConsent] = useState(true);
  const [accountType, setAccountType] = useState<"individual" | "organization">(state.user.accountType);
  const [lang, setLang] = useState<"ts" | "cli" | "python">("ts");
  const [source, setSource] = useState<string | null>(state.user.source);
  const [walletChoice, setWalletChoice] = useState<string | null>(null);
  const fullKey = useMemo(() => newKeyString(), []);

  const dotIndex = DOTS.indexOf(step);

  function signIn(e?: FormEvent) {
    e?.preventDefault();
    const em = email || "you@company.com";
    dispatch({ type: "user", patch: { email: em, name: em.split("@")[0].replace(/[._-]/g, " ") } });
    setStep("consent");
  }

  function finishWallet(backendId: string | null) {
    if (backendId) {
      const b = WALLET_BACKENDS.find((w) => w.id === backendId)!;
      const wallet: Wallet = {
        id: `w_${Date.now()}`,
        backend: b.name,
        name: accountType === "organization" ? "Team agent wallet" : "Agent wallet",
        address: "0x9a3f" + Math.random().toString(16).slice(2, 10) + "c41e",
        chains: b.id === "coinbase" ? ["Base", "Solana"] : ["Base", "Solana", "Tempo"],
        balances: { USDC: 0, EURC: 0 },
        primary: true,
      };
      dispatch({ type: "addWallet", wallet });
    }
    setStep("source");
  }

  function finish() {
    dispatch({ type: "user", patch: { source, accountType, consent: true } });
    dispatch({ type: "patch", patch: { onboarded: true } });
    router.push("/app");
  }

  const snippets = {
    ts: `import { pay } from "superstables";

const res = await pay.route(
  "https://api.example.com/v1/prices",
  { max: "0.05 USDC" }
);
// key: ${fullKey}
console.log(res.receipt, res.body);`,
    cli: `export SUPERSTABLES_KEY=${fullKey}

superstables pay https://api.example.com/v1/prices --max 0.05 USDC`,
    python: `from superstables import pay

res = pay.route(
    "https://api.example.com/v1/prices",
    max="0.05 USDC",
    key="${fullKey}",
)
print(res.receipt, res.body)`,
  };

  /* ---------- screens ---------- */
  if (step === "signin" || step === "consent") {
    return (
      <main className="auth-shell">
        <div className="auth-card">
          <div className="auth-head">
            <span className="auth-logo">
              <LogoMark variant="auto" size={28} />
            </span>
            {step === "signin" ? (
              <h1>Sign in</h1>
            ) : (
              <>
                <h1>Legal consent</h1>
                <p>Read and accept the terms to continue.</p>
              </>
            )}
          </div>
          {step === "signin" ? (
            <form className="auth-form" onSubmit={signIn}>
              <div className="auth-providers">
                <button type="button" aria-label="Continue with GitHub" onClick={() => signIn()}>
                  <Icon name="github" size={20} />
                </button>
                <button type="button" aria-label="Continue with Google" onClick={() => signIn()}>
                  <Icon name="globe" size={20} />
                </button>
                <button type="button" aria-label="Continue with a wallet" onClick={() => signIn()}>
                  <Icon name="wallet" size={20} />
                </button>
              </div>
              <div className="auth-or">or</div>
              <label className="field">
                <span>Email address</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" />
              </label>
              <button className="btn primary lg block" type="submit">
                Continue
              </button>
              <p className="auth-foot">
                New here? Signing in creates your account.
              </p>
            </form>
          ) : (
            <div className="auth-form">
              <label className="check">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>
                  I agree to the <a className="link" href="#">Terms of Service</a>, <a className="link" href="#">Privacy Policy</a> and the{" "}
                  <a className="link" href="#">Non-custodial Software Notice</a>.
                </span>
              </label>
              <button className="btn primary lg block" disabled={!consent} onClick={() => setStep("welcome")}>
                Continue
              </button>
              <p className="auth-foot">
                Already have an account? <button className="link" onClick={() => setStep("signin")}>Sign in</button>
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="ob-shell">
      {step === "welcome" && (
        <>
          <div className="ob-card">
            <h1>Welcome to Superstables</h1>
            <p className="sub">The payment router for AI agents. Pay and get paid on any rail, switch anytime.</p>
            <div className="feature-cards">
              <div className="feature-card">
                <Icon name="shuffle" />
                <h3>Every rail</h3>
                <p>x402, Stripe MPP, Google AP2 and Virtuals ACP on Base, Solana and Tempo through one call.</p>
              </div>
              <div className="feature-card">
                <Icon name="zap" />
                <h3>Cheapest live path</h3>
                <p>Every facilitator is quoted on fee, latency and health. If a rail drops, the payment moves to the next one.</p>
              </div>
              <div className="feature-card">
                <Icon name="dollar" />
                <h3>Non-custodial</h3>
                <p>Payments are signed from the agent&apos;s own wallet under caps you set. We never hold funds.</p>
              </div>
            </div>
            <div>
              <div className="section-label">How will you be using Superstables?</div>
              <p style={{ color: "var(--ink-2)", fontSize: 14.5, marginBottom: 14 }}>You can change this later.</p>
              <div className="choice-grid">
                <button className={`choice${accountType === "individual" ? " on" : ""}`} onClick={() => setAccountType("individual")}>
                  <span className="ic"><Icon name="user" /></span>
                  <span><h3>Individual</h3><p>Give your own agents a way to pay for data, compute and tools.</p></span>
                  <span className="dot" />
                </button>
                <button className={`choice${accountType === "organization" ? " on" : ""}`} onClick={() => setAccountType("organization")}>
                  <span className="ic"><Icon name="building" /></span>
                  <span><h3>Organization</h3><p>Run a fleet of agents with shared policies, roles and one treasury.</p></span>
                  <span className="dot" />
                </button>
              </div>
            </div>
          </div>
          <div className="ob-actions">
            <span className="spacer" />
            <button className="btn primary lg" onClick={() => setStep("workspace")}>Next</button>
          </div>
        </>
      )}

      {step === "workspace" && (
        <>
          <div className="ob-card">
            <h1><Icon name="checkcircle" className="ok" /> Your workspace is ready</h1>
            <p className="sub">A workspace keeps your API keys, spend policy and activity in one place. We created your first one with a key so your agent can make a request right away.</p>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Your API key</div>
              <div className="keybox">
                <code>{fullKey.slice(0, 11)}{"•".repeat(22)}{fullKey.slice(-4)}</code>
                <CopyBtn text={fullKey} className="btn" />
              </div>
              <p className="field-hint" style={{ marginTop: 8 }}>This is the only time the full key is shown. You can create another one later.</p>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Make your first payment</div>
              <div className="tabs" style={{ marginBottom: 10 }}>
                {(["ts", "cli", "python"] as const).map((l) => (
                  <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)}>
                    {l === "ts" ? "TypeScript" : l === "cli" ? "CLI" : "Python"}
                  </button>
                ))}
              </div>
              <Code code={snippets[lang]} />
            </div>
          </div>
          <div className="ob-actions">
            <button className="btn ghost" onClick={() => setStep("welcome")}><Icon name="back" size={16} /> Back</button>
            <button className="btn primary lg" onClick={() => setStep("wallet")}>Continue</button>
          </div>
        </>
      )}

      {step === "wallet" && (
        <>
          <div className="ob-card">
            <h1>Connect a wallet</h1>
            <p className="sub">Your agent pays from its own smart-contract wallet. Pick a backend; no funds move yet.</p>
            <div className="wallet-list">
              {WALLET_BACKENDS.map((w) => (
                <button key={w.id} className="wallet-row" onClick={() => setWalletChoice(w.id)}>
                  <span className="ic">{w.tag}</span>
                  <span><b>{w.name}</b><small>{w.desc}</small></span>
                  <span className={`state${walletChoice === w.id ? " on" : ""}`}>{walletChoice === w.id ? "Selected" : "Not connected"}</span>
                </button>
              ))}
            </div>
            <p className="field-hint">A wallet is required before the router can settle a payment. Policies you set are enforced by the wallet on-chain, not by our code.</p>
          </div>
          <div className="ob-actions">
            <button className="btn ghost" onClick={() => setStep("workspace")}><Icon name="back" size={16} /> Back</button>
            <span className="spacer" />
            <button className="btn ghost" onClick={() => finishWallet(null)}>I&apos;ll do this later</button>
            <button className="btn primary lg" disabled={!walletChoice} onClick={() => finishWallet(walletChoice)}>Connect</button>
          </div>
        </>
      )}

      {step === "source" && (
        <>
          <div className="ob-card">
            <h1>Where did you first hear about Superstables?</h1>
            <p className="sub">This helps us understand how people find us.</p>
            <div className="radio-list">
              {SOURCES.map((s) => (
                <label key={s}>
                  <input type="radio" name="source" checked={source === s} onChange={() => setSource(s)} /> {s}
                </label>
              ))}
            </div>
          </div>
          <div className="ob-actions">
            <button className="btn ghost" onClick={() => setStep("wallet")}><Icon name="back" size={16} /> Back</button>
            <button className="btn primary lg" disabled={!source} onClick={() => setStep("done")}>Continue</button>
          </div>
        </>
      )}

      {step === "done" && (
        <>
          <div className="ob-card" style={{ marginTop: "12vh" }}>
            <h1><Icon name="checkcircle" className="ok" /> You&apos;re all set</h1>
            <p className="sub">Your workspace is configured. Head to the dashboard to manage keys, policies and wallets, or read the docs to start building.</p>
            <button className="btn primary lg block" style={{ maxWidth: 320 }} onClick={finish}>Go to dashboard</button>
          </div>
        </>
      )}

      <div className="ob-dots" aria-hidden="true">
        {DOTS.map((d, i) => (
          <i key={d} className={i < dotIndex ? "done" : i === dotIndex ? "on" : ""} />
        ))}
      </div>
    </main>
  );
}
