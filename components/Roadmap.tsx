import Reveal from "./Reveal";
import { phases } from "@/content/site";

export default function Roadmap() {
  return (
    <section id="roadmap">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">Roadmap</span>
          <h2>The index is live, and the router is being built on top of it.</h2>
          <p className="lede">
            One phase at a time, each gated on the previous one working in public. Nothing below Phase 0 exists yet and we would rather tell you that here than let you find out in the docs.
          </p>
        </Reveal>
        <Reveal className="phases four">
          {phases.map((p) => (
            <div key={p.idx} className={`phase${p.now ? " now" : ""}`}>
              <div className="idx">
                <span>{p.idx}</span>
                <span>{p.now ? <span className="pill ok">Live</span> : p.window}</span>
              </div>
              <h3>{p.title}</h3>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <div className="gate">
                <b>{p.now ? "Status" : "Gate"}</b>
                {p.gate}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
