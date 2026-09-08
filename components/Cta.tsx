import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/content/site";

export default function Cta() {
  return (
    <section className="cta" id="early">
      <div className="wrap">
        <Reveal className="cta-box">
          <div>
            <span className="eyebrow">Open source, non-custodial</span>
            <h2 style={{ marginTop: 16 }}>See what agents can pay for and earn on today.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Browse the live, independently probed index of payable services and on-chain yield, or let your agent query it as JSON, no key needed.
            </p>
          </div>
          <div className="hero-actions" style={{ justifyContent: "flex-end" }}>
            <Link className="btn primary lg" href="/discover">
              Discover payable services
            </Link>
            <a className="btn lg" href={site.links.x} target="_blank" rel="noopener noreferrer">
              Book a demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
