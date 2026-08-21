import Reveal from "./Reveal";

export default function Api() {
  return (
    <section id="api">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">The whole API</span>
          <h2>Two lines. Every rail.</h2>
          <p className="lede">
            TypeScript and Python SDKs, a CLI for humans, and an MCP server so Claude, Codex and Gemini agents pick it
            up without a wrapper.
          </p>
        </Reveal>
        <Reveal className="api">
          <div className="code-card">
            <header>
              <h3>Pay</h3>
              <span>superstables/pay</span>
            </header>
            <pre>
              <code>
                <span className="c-kw">import</span> {"{ pay } "}<span className="c-kw">from</span>{" "}
                <span className="c-str">&quot;superstables&quot;</span>;{"\n\n"}
                <span className="c-kw">const</span> res = <span className="c-kw">await</span> pay.
                <span className="c-fn">route</span>({"\n"}
                {"  "}<span className="c-str">&quot;https://api.example.com/v1/prices&quot;</span>,{"\n"}
                {"  "}{"{ max: "}<span className="c-str">&quot;0.05 USDC&quot;</span>{" }"}{"\n"});{"\n\n"}
                <span className="c-com">{"// → protocol: x402 · chain: solana · fee: $0.0004"}</span>{"\n"}
                <span className="c-com">{"// → receipt: 0x3f9a…e2c1 · spent: 0.0104 USDC"}</span>{"\n"}
                res.body  <span className="c-com">{"// the data you paid for"}</span>
              </code>
            </pre>
            <footer>
              Protocol, chain, stablecoin and facilitator are chosen at call time. Your code never changes when a rail
              does.
            </footer>
          </div>
          <div className="code-card">
            <header>
              <h3>Earn</h3>
              <span>superstables/earn</span>
            </header>
            <pre>
              <code>
                <span className="c-kw">import</span> {"{ earn } "}<span className="c-kw">from</span>{" "}
                <span className="c-str">&quot;superstables&quot;</span>;{"\n\n"}
                app.<span className="c-fn">get</span>(<span className="c-str">&quot;/v1/forecast&quot;</span>,{"\n"}
                {"  "}earn.<span className="c-fn">accept</span>({"{ price: "}
                <span className="c-str">&quot;0.01 USDC&quot;</span>{" }"}),{"\n"}
                {"  "}handler{"\n"});{"\n\n"}
                <span className="c-com">{"// payable over x402, MPP, AP2 and ACP"}</span>{"\n"}
                <span className="c-com">{"// listed in the discovery index automatically"}</span>{"\n"}
                <span className="c-com">{"// settles to the agent's treasury wallet"}</span>
              </code>
            </pre>
            <footer>
              One middleware and your agent&apos;s service is payable by any other agent, over any rail, and indexed
              for discovery.
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
