import CopyButton from "./CopyButton";
import Terminal from "./Terminal";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap grid">
        <div className="hero-copy">
          <span className="eyebrow">Open source · Non-custodial · Built in Lisbon</span>
          <h1>
            The payment router for <em>AI agents.</em>
          </h1>
          <p className="lede">
            One CLI, one SDK, one MCP server. Your agent calls <code className="mono">pay(url, max)</code> —
            Superstables detects the protocol, quotes every live rail, and settles the cheapest path from the
            agent&apos;s own wallet, under a cap you control.
          </p>
          <div className="hero-actions">
            <span className="install">
              <span className="dollar">$</span>
              <span>{site.installCmd}</span>
              <CopyButton text={site.installCmd} />
            </span>
            <a className="btn lg" href="#api">
              Read the docs
            </a>
          </div>
          <div className="hero-meta">
            <span>x402 · Stripe MPP · Google AP2 · Virtuals ACP</span>
            <span>Base · Solana · Tempo</span>
            <span>USDC · EURC · USDT · PYUSD</span>
          </div>
        </div>
        <div className="hero-demo">
          <Terminal />
        </div>
      </div>
    </header>
  );
}
