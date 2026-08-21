"use client";

import { useEffect, useState, type ReactNode } from "react";

type Line = { t: number; node: ReactNode };

/** The routing demo: one `pay` call, end to end. Loops. */
const LINES: Line[] = [
  {
    t: 120,
    node: (
      <>
        <span className="t-prompt">$</span> <span className="t-cmd">superstables pay</span>{" "}
        <span className="t-str">https://api.example.com/v1/prices</span>{" "}
        <span className="t-kw">--max</span> <span className="t-str">0.05</span>{" "}
        <span className="t-str">USDC</span>
      </>
    ),
  },
  { t: 500, node: null },
  {
    t: 200,
    node: (
      <>
        <span className="t-muted">→ detecting</span>{"   "}
        <span className="t-dim">HTTP 402 · x402 v2 · accepts USDC on base, solana</span>
      </>
    ),
  },
  {
    t: 450,
    node: (
      <>
        <span className="t-muted">→ quoting</span>{"     "}
        <span className="t-dim">4 facilitators, 3 chains</span>
      </>
    ),
  },
  {
    t: 260,
    node: (
      <>
        {"  "}<span className="t-dim">x402   · base    · usdc</span>{"   fee "}
        <span className="num">$0.0011</span>{"   "}<span className="t-dim">~1.9s</span>
      </>
    ),
  },
  {
    t: 180,
    node: (
      <>
        {"  "}<span className="t-pick">x402   · solana  · usdc   fee $0.0004   ~0.4s  ✓ cheapest</span>
      </>
    ),
  },
  {
    t: 180,
    node: (
      <>
        {"  "}<span className="t-dim">mpp    · tempo   · usdc</span>{"   fee "}
        <span className="num">$0.0009</span>{"   "}<span className="t-dim">~0.8s</span>
      </>
    ),
  },
  {
    t: 180,
    node: (
      <>
        {"  "}<span className="t-dim">ap2    · base    · eurc</span>{"   "}
        <span className="t-down">unfunded</span>
      </>
    ),
  },
  {
    t: 420,
    node: (
      <>
        <span className="t-muted">→ policy</span>{"      "}
        <span className="t-ok">0.0104 USDC ≤ 0.05 cap</span>{" "}
        <span className="t-dim">· session 1.87 → 1.86 left</span>
      </>
    ),
  },
  {
    t: 420,
    node: (
      <>
        <span className="t-muted">→ signing</span>{"     "}
        <span className="t-dim">smart-wallet 0x9a3f…c41e · local key</span>
      </>
    ),
  },
  {
    t: 700,
    node: (
      <>
        <span className="t-muted">→ settled</span>{"     "}
        <span className="t-ok">✓</span>{" "}
        <span className="t-dim">receipt 5Kq9…wP2t · solana · 412ms</span>
      </>
    ),
  },
  { t: 300, node: null },
  {
    t: 200,
    node: (
      <span className="t-dim">{'{ "BTC": 118420.11, "ETH": 4871.30, "SOL": 244.02 … }'}</span>
    ),
  },
  {
    t: 2600,
    node: (
      <>
        <span className="t-prompt">$</span> <span className="cursor" />
      </>
    ),
  },
];

const LOOP_PAUSE = 3800;

export default function Terminal() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (reduced) {
      // Show the finished state at once, no animation.
      timers.push(window.setTimeout(() => setCount(LINES.length), 0));
      return () => timers.forEach(clearTimeout);
    }
    let delay = 0;
    const run = () => {
      setCount(0);
      delay = 0;
      LINES.forEach((l, i) => {
        delay += l.t;
        timers.push(window.setTimeout(() => setCount(i + 1), delay));
      });
      timers.push(window.setTimeout(run, delay + LOOP_PAUSE));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="term" aria-label="Live routing demo">
      <div className="term-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>agent · claude-code · wallet 0x9a3f…c41e</span>
        <span>live</span>
      </div>
      <div className="term-body">
        {LINES.slice(0, count).map((l, i) => (
          <div key={i} className="on">
            {l.node ?? " "}
          </div>
        ))}
      </div>
      <div className="term-foot">
        <span>policy: cap 0.05 USDC / call · session 2.00 USDC</span>
        <span>non-custodial · signed locally</span>
      </div>
    </div>
  );
}
