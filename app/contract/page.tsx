import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CopyBtn } from "@/components/app/ui";
import { tokenContract as staticTokenContract } from "@/content/site";
import { getSetting, TOKEN_CONTRACT_KEY } from "@/lib/settings";
import "../app.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contract",
  description: "The official Superstables token contract on Robinhood Chain. The address is published here first; treat any other address as fake.",
};

export default async function ContractPage() {
  const tokenContract = (await getSetting(TOKEN_CONTRACT_KEY)) || staticTokenContract;
  return (
    <>
      <Nav />
      <main className="wrap" style={{ padding: "56px 0 96px", maxWidth: 760 }}>
        <span className="eyebrow plain">Token</span>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", marginTop: 10 }}>Contract</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          We are funding the initial development of Superstables with a token on Robinhood Chain, paired against a
          tokenized stock. This page is the only official source for the contract address. If you see an address
          anywhere else before it appears here, it is fake.
        </p>

        <div className="panel" style={{ marginTop: 28 }}>
          <div className="settings-row">
            <span>
              <b>Contract address</b>
              {tokenContract ? (
                <p className="mono" style={{ wordBreak: "break-all" }}>{tokenContract}</p>
              ) : (
                <p>Not published yet. It will appear here first, and we will link it from our X account only after it is live on this page.</p>
              )}
            </span>
            {tokenContract && <CopyBtn text={tokenContract} className="btn sm" />}
          </div>
          <div className="settings-row">
            <span>
              <b>Chain</b>
              <p>Robinhood Chain</p>
            </span>
          </div>
        </div>

        <div className="sub-head" style={{ marginTop: 36 }}><h2>How the fees work</h2></div>
        <p style={{ color: "var(--ink-2)" }}>
          Every trade carries a 1% fee, and all of it goes to development. There is no marketing wallet and no team
          allocation taken from fees.
        </p>

        <div className="sub-head" style={{ marginTop: 32 }}><h2>The dev wallet is locked</h2></div>
        <p style={{ color: "var(--ink-2)" }}>
          Tokens in the dev wallet are locked at launch. Unlocking them requires a governance vote on when and how the
          funds are deployed, and the funds can only be deployed into development and R&amp;D: the router, the index,
          and the audits they need. Lock and vote details will be published on this page with the contract address.
        </p>

        <div className="sub-head" style={{ marginTop: 32 }}><h2>Why a token</h2></div>
        <p style={{ color: "var(--ink-2)" }}>
          The index is live and free, and the router is in development. Building the router properly, including an
          external security audit of the pay path before it ships, costs money. The token is how we raise it while
          keeping the software open source and non-custodial.
        </p>

        <p style={{ marginTop: 28, fontSize: 14, color: "var(--ink-2)" }}>
          Nothing on this page is financial advice. Questions:{" "}
          <a className="link" href="https://x.com/superstables" target="_blank" rel="noopener noreferrer">@superstables</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
