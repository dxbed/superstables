import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CopyBtn } from "@/components/app/ui";
import { treasury } from "@/content/treasury";
import "../app.css";

export const metadata: Metadata = {
  title: "Treasury",
  description: "Where the STBL/NVDA trading fees go: what has been collected, what has been spent, itemized. Updated by hand after every change.",
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const date = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export default function TreasuryPage() {
  const t = treasury;
  const totalSpent = t.categories.reduce((s, c) => s + c.usd, 0);
  return (
    <>
      <Nav />
      <main className="wrap" style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 860 }}>
        <span className="eyebrow plain">Token</span>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", marginTop: 10 }}>Treasury</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          Every STBL/NVDA trade pays a 1% fee in tokenized NVDA. This page is the public ledger of what those fees have
          generated and where the money goes, itemized down to single expenses. It is updated by hand after every
          change; last updated {date(t.lastUpdated)}, with NVDA valued at {usd(t.nvdaPriceUsd)}.
        </p>

        <div className="panel" style={{ marginTop: 28 }}>
          <div className="settings-row"><span><b>Available</b><p>Claimed to cash and not yet spent.</p></span><span className="mono" style={{ fontSize: 18 }}>{usd(t.cash.availableUsd)}</span></div>
          <div className="settings-row"><span><b>Claimed to cash</b><p>{t.fees.claimedNvda.toLocaleString("en-US", { maximumFractionDigits: 6 })} NVDA converted so far.</p></span><span className="mono">{usd(t.cash.claimedUsd)}</span></div>
          <div className="settings-row"><span><b>Total spent</b><p>Itemized below.</p></span><span className="mono">{usd(t.cash.spentUsd)}</span></div>
          <div className="settings-row"><span><b>Fees generated</b><p>Since launch, on the pons pair. {t.fees.pendingClaimNvda.toLocaleString("en-US")} NVDA still pending claim.</p></span><span className="mono">{t.fees.generatedNvda.toLocaleString("en-US", { maximumFractionDigits: 6 })} NVDA</span></div>
        </div>

        <div className="sub-head" style={{ marginTop: 36 }}><h2>Wallets</h2></div>
        <div className="panel">
          {t.wallets.map((w) => (
            <div className="settings-row" key={w.address}>
              <span>
                <b>{w.label}</b>
                <p className="mono" style={{ wordBreak: "break-all" }}>{w.address}</p>
                <p>{w.role}{" "}{w.link && <a className="link" href={w.link.href} target="_blank" rel="noopener noreferrer">{w.link.label}</a>}</p>
              </span>
              <CopyBtn text={w.address} className="btn sm" />
            </div>
          ))}
        </div>

        <div className="sub-head" style={{ marginTop: 36 }}><h2>Spending by category</h2></div>
        <div className="panel">
          {t.categories.map((c) => (
            <div className="settings-row" key={c.name}>
              <span><b>{c.name}</b></span>
              <span className="mono">{usd(c.usd)} · {Math.round((c.usd / totalSpent) * 100)}%</span>
            </div>
          ))}
        </div>

        <div className="sub-head" style={{ marginTop: 36 }}><h2>Every expense</h2></div>
        <div className="panel">
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Date</th><th>Category</th><th>What</th><th className="num">USD</th></tr></thead>
              <tbody>
                {t.expenses.map((e) => (
                  <tr key={e.date + e.usd}>
                    <td className="mono" style={{ whiteSpace: "nowrap" }}>{date(e.date)}</td>
                    <td><span className="pill soft">{e.category}</span></td>
                    <td>{e.description}</td>
                    <td className="num mono">{usd(e.usd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ marginTop: 28, fontSize: 14, color: "var(--ink-2)" }}>
          Contract address and the dev wallet lock terms are on the <Link className="link" href="/contract">Contract page</Link>.
          Nothing on this page is financial advice. Questions:{" "}
          <a className="link" href="https://x.com/superstables" target="_blank" rel="noopener noreferrer">@superstables</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
