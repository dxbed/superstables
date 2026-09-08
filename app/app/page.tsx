"use client";

import Link from "next/link";
import Icon, { type IconName } from "@/components/app/Icon";
import { fmtUsd, useNow, useStore } from "@/lib/store";

const QUICK: { href: string; icon: IconName; title: string; desc: string }[] = [
  { href: "/app/keys", icon: "key", title: "API keys", desc: "Create and manage the keys your agents pay with." },
  { href: "/app/policies", icon: "shield", title: "Policies", desc: "Caps, allow lists, approvals and the kill switch." },
  { href: "/app/wallets", icon: "wallet", title: "Wallets", desc: "Connect the smart-contract wallets the router signs from." },
  { href: "/app/routing", icon: "route", title: "Routing", desc: "Choose rails, chains and how paths are ranked." },
  { href: "/app/discovery", icon: "search", title: "Discovery", desc: "Browse payable data, compute and tools across every rail." },
  { href: "/app/earn", icon: "earn", title: "Earn", desc: "Expose your own endpoints and get paid by other agents." },
  { href: "/app/transactions", icon: "list", title: "Transactions", desc: "Every routed payment with its receipt and path." },
  { href: "/app/settings", icon: "settings", title: "Settings", desc: "Workspace name, budgets and webhooks." },
];

export default function Overview() {
  const { state, dispatch } = useStore();
  const now = useNow();
  const week = state.txns.filter((t) => now - new Date(t.at).getTime() < 7 * 864e5);
  const spend = week.reduce((a, t) => a + (t.status === "settled" ? t.amount + t.fee : 0), 0);
  const fees = week.reduce((a, t) => a + (t.status === "settled" ? t.fee : 0), 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{state.workspace.name}</h1>
          <p>Your keys, spend policy, wallets and routing rules live here. Every payment an agent makes with a key from this workspace shows up below.</p>
        </div>
      </div>
      {!state.dismissedBanner && (
        <div className="banner">
          <div>
            <b>Review build</b>
            Nothing on these pages moves real money. State is saved in this browser only.{" "}
            {state.txns.length === 0 ? (
              <button className="link" onClick={() => dispatch({ type: "loadSample" })}>Load sample activity</button>
            ) : (
              <button className="link" onClick={() => dispatch({ type: "clearSample" })}>Clear sample activity</button>
            )}
          </div>
          <button aria-label="Dismiss" onClick={() => dispatch({ type: "patch", patch: { dismissedBanner: true } })}>×</button>
        </div>
      )}
      <div className="sub-head">
        <h2>This week</h2>
        <Link href="/app/activity">View activity <Icon name="chevron" size={12} /></Link>
      </div>
      <div className="stat-row">
        {week.length === 0 ? (
          <>
            <div className="stat-card empty"><Icon name="chart" />No spend this week</div>
            <div className="stat-card empty"><Icon name="chart" />No payments this week</div>
            <div className="stat-card empty"><Icon name="chart" />No routing fees this week</div>
          </>
        ) : (
          <>
            <div className="stat-card"><span className="l">Spend</span><span className="v">{fmtUsd(spend, 2)}</span><span className="d">across {new Set(week.map((t) => t.stable)).size} stablecoins</span></div>
            <div className="stat-card"><span className="l">Payments</span><span className="v">{week.length}</span><span className="d">{week.filter((t) => t.status === "failed").length} failed</span></div>
            <div className="stat-card"><span className="l">Routing fees</span><span className="v">{fmtUsd(fees, 4)}</span><span className="d">{week.length ? `${((fees / Math.max(spend, 1e-9)) * 100).toFixed(2)}% of spend` : ""}</span></div>
          </>
        )}
      </div>
      <div className="quick-grid">
        {QUICK.map((q) => (
          <Link key={q.href} href={q.href} className="quick">
            <span className="ic"><Icon name={q.icon} /></span>
            <span><b>{q.title}</b><p>{q.desc}</p></span>
            <Icon name="chevron" />
          </Link>
        ))}
      </div>
    </>
  );
}
