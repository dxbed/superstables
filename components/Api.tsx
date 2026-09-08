import Reveal from "./Reveal";

export default function Api() {
  return (
    <section id="api">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">The index API</span>
          <h2>One request, everything payable.</h2>
          <p className="lede">
            The whole index is public JSON and native MCP tools: no key, no account, CORS open. It works today; try either of these from your terminal.
          </p>
        </Reveal>
        <Reveal className="api">
          <div className="code-card">
            <header>
              <h3>REST</h3>
              <span>api/v1/services</span>
            </header>
            <pre>
              <code>
                <span className="c-com">{"# live compute services on x402"}</span>{"\n"}
                curl <span className="c-str">&quot;https://superstables.com/api/v1/services\\{"\n"}  ?rail=x402&amp;live=true&amp;q=compute&quot;</span>{"\n\n"}
                <span className="c-com">{"// { counts: { total, live, dual_rail },"}</span>{"\n"}
                <span className="c-com">{"//   services: [{ id, name, rails, chains,"}</span>{"\n"}
                <span className="c-com">{"//     assets, price, endpoint, live, ... }] }"}</span>
              </code>
            </pre>
            <footer>
              Filter by rail, chain, asset, liveness and free text. Spec at <a className="link" href="https://www.superstables.com/openapi.json">openapi.json</a>; plain questions work too, via <a className="link" href="https://www.superstables.com/ask?query=live%20gpu%20compute">/ask</a>.
            </footer>
          </div>
          <div className="code-card">
            <header>
              <h3>MCP</h3>
              <span>api/mcp</span>
            </header>
            <pre>
              <code>
                {"{"}{"\n"}
                {"  "}<span className="c-str">&quot;mcpServers&quot;</span>: {"{"}{"\n"}
                {"    "}<span className="c-str">&quot;superstables&quot;</span>: {"{"}{"\n"}
                {"      "}<span className="c-str">&quot;url&quot;</span>: <span className="c-str">&quot;https://superstables.com/api/mcp&quot;</span>{"\n"}
                {"    "}{"}"}{"\n"}
                {"  "}{"}"}{"\n"}
                {"}"}{"\n\n"}
                <span className="c-com">{"// tools: find_services, get_service, get_stats"}</span>
              </code>
            </pre>
            <footer>
              Claude, Codex and any MCP client get the index as tools with that one block. No auth, read only.
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
