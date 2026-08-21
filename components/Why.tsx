import Reveal from "./Reveal";
import RouteDiagram from "./RouteDiagram";
import { steps } from "@/content/site";

export default function Why() {
  return (
    <section id="why">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">Why a router</span>
          <h2>The rails are built. Nobody connects them.</h2>
          <p className="lede">
            Coinbase routes to Base. Stripe routes to Tempo. Every directory lists services but settles nothing. An
            agent that wants to pay for data today has to learn four protocols, hold three stablecoins and bet on who
            wins. Superstables sits between every agent and every rail — and is neutral in a way no incumbent can be.
          </p>
        </Reveal>
        <Reveal className="grid">
          <RouteDiagram />
        </Reveal>
        <Reveal className="three">
          {steps.map((s) => (
            <div key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
