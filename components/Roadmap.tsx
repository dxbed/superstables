import Reveal from "./Reveal";
import { phases } from "@/content/site";

export default function Roadmap() {
  return (
    <section id="roadmap">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow plain">Roadmap</span>
          <h2>Router first. Then the agent&apos;s treasury. Then its passport.</h2>
          <p className="lede">
            Because the router sits in the request path with the agent&apos;s wallet and policy, it becomes the
            natural place for the agent to hold revenue, pay itself, and prove who it is.
          </p>
        </Reveal>
        <Reveal className="phases">
          {phases.map((p) => (
            <div key={p.idx} className={`phase${p.now ? " now" : ""}`}>
              <div className="idx">
                <span>{p.idx}</span>
                <span>{p.window}</span>
              </div>
              <h3>{p.title}</h3>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <div className="gate">
                <b>Gate</b>
                {p.gate}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
