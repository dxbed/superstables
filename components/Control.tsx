import Reveal from "./Reveal";
import { guards } from "@/content/site";

export default function Control() {
  return (
    <section id="control">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">Principal control plane</span>
          <h2>Let an agent hold money without losing sleep.</h2>
          <p className="lede">
            A prompt injection shouldn&apos;t be able to drain a wallet. Policies are enforced on-chain by the
            agent&apos;s smart-contract wallet — not in application code the model can talk its way around.
          </p>
        </Reveal>
        <Reveal className="control">
          <div className="policy">
            <header>
              <span>superstables.policy.yaml</span>
              <span>enforced on-chain</span>
            </header>
            <pre>
              <code>
                <span className="c-kw">agent</span>: research-bot{"\n"}
                <span className="c-kw">wallet</span>: 0x9a3f…c41e{"\n\n"}
                <span className="c-kw">caps</span>:{"\n"}
                {"  per_call:   "}<span className="c-str">0.05 USDC</span>{"\n"}
                {"  session:    "}<span className="c-str">2.00 USDC</span>{"\n"}
                {"  daily:      "}<span className="c-str">25.00 USDC</span>{"\n\n"}
                <span className="c-kw">allow</span>:{"\n"}
                {"  - api.example.com\n"}
                {"  - *.nosana.io\n"}
                <span className="c-kw">deny</span>:{"\n"}
                {"  - *.unknown-broker.xyz\n\n"}
                <span className="c-kw">approve_above</span>: <span className="c-str">10.00 USDC</span>{"\n"}
                <span className="c-kw">stables</span>: [USDC, EURC]{"\n"}
                <span className="c-kw">kill_switch</span>: on
              </code>
            </pre>
          </div>
          <div className="guards">
            {guards.map((g) => (
              <div key={g.k} className="guard">
                <span className="k">{g.k}</span>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
