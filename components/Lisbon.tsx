import Reveal from "./Reveal";
import { lisbon } from "@/content/site";

export default function Lisbon() {
  return (
    <section id="lisbon">
      <div className="wrap">
        <Reveal className="lisbon">
          <h2>Built in Lisbon, because Europe is the part nobody else is building.</h2>
          <div className="lisbon-list">
            {lisbon.map((l) => (
              <div key={l.k}>
                <b>{l.k}</b>
                <span>{l.body}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
