import Reveal from "./Reveal";
import { principles } from "@/content/site";

export default function Neutral() {
  return (
    <section>
      <div className="wrap">
        <Reveal className="neutral">
          <blockquote>
            Coinbase will never route to Tempo. Stripe will never route to Base. <em>We route to both</em> — because we
            don&apos;t own a rail, a chain, a stablecoin or your funds.
          </blockquote>
          <div className="principles">
            {principles.map((p) => (
              <div key={p.label}>
                <b>{p.label}</b>
                <span>{p.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
