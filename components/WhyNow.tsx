import Reveal from "./Reveal";
import { stats } from "@/content/site";

export default function WhyNow() {
  return (
    <section>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">Why now</span>
          <h2>Agents already pay in stablecoins. The volume is small; the curve isn&apos;t.</h2>
        </Reveal>
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
        <Reveal as="p" className="source">
          Figures from Keyrock, &ldquo;Who Pays the Agent?&rdquo;, Coinbase, Circle and Artemis/CoinDesk analysis,
          August 2026. Headline protocol counts overstate real commerce; we publish our own routed volume as
          independently verifiable on-chain metrics.
        </Reveal>
      </div>
    </section>
  );
}
