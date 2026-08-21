import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";

export default function Cta() {
  return (
    <section className="cta" id="early">
      <div className="wrap">
        <Reveal className="cta-box">
          <div>
            <span className="eyebrow">Early access · Phase 1 opens November 2026</span>
            <h2 style={{ marginTop: 16 }}>Give your agent a way to pay.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              We&apos;re onboarding agent builders, data and compute APIs, and a handful of design partners. Tell us
              what your agent needs to buy.
            </p>
          </div>
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}
