import Link from "next/link";
import Reveal from "./Reveal";
import { stats } from "@/content/site";

const FEATURES = [
  { title: "Every rail", body: "x402, Stripe MPP, Google AP2 and Virtuals ACP on Base, Solana and Tempo, through one call." },
  { title: "Cheapest live path", body: "Each facilitator is quoted on fee, latency and health. If a rail drops, the payment moves to the next one." },
  { title: "Put balances to work", body: "The index tracks RWA vaults, tokenized stocks and stablecoin yield next to the services agents pay for, so the same balance can spend and earn." },
  { title: "Get paid too", body: "One middleware makes your agent's service payable by any other agent, on any rail." },
];

export default function Hero() {
  return (
    <>
      <header className="hero simple">
        <div className="wrap">
          <h1>
            The payment router
            <br />
            for AI agents
          </h1>
          <p className="lede">Agents pay for data, compute and tools on any rail, and put idle stablecoins to work: RWA yield vaults and tokenized stocks, powered by <b>Robinhood Chain and USDG</b>.</p>
          <div className="hero-actions">
            <Link className="btn primary lg" href="/discover">
              Discover payable services
            </Link>
            <Link className="btn lg" href="/submit">
              New listing
            </Link>
          </div>
          <p className="hero-api">
            The index behind it is a free public API:{" "}
            <a href="https://www.superstables.com/api/v1/services"><code>GET /api/v1/services</code></a>, CORS open, no key, every entry independently liveness-probed.
          </p>
        </div>
      </header>
      <section className="stats-band">
        <div className="wrap">
          <Reveal className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="v num">
                  {s.value}
                  <small>{s.unit}</small>
                </div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="features">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </Reveal>
          <p className="source">Market figures from Keyrock, Coinbase, Circle and Artemis/CoinDesk analysis, August 2026.</p>
        </div>
      </section>
    </>
  );
}
