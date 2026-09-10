import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Superstables, the payment router for AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand fonts bundled in assets/fonts (WOFF v1, which satori reads) so the image builds offline. */
async function font(file: string) {
  const buf = await readFile(path.join(process.cwd(), "assets", "fonts", file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

const LIME = "#CBFF00";
const INK = "#E9EDE6";
const INK2 = "#98A39A";
const INK3 = "#5E6862";
const LINE = "#2B333A";

const chips = [
  ["x402", "Stripe MPP", "Google AP2", "Virtuals ACP"],
  ["Base", "Solana", "Tempo"],
  ["USDC", "EURC", "USDT", "PYUSD"],
];

export default async function OpenGraphImage() {
  const [display, body, mono] = await Promise.all([font("Bricolage-SemiBold.woff"), font("Figtree-Medium.woff"), font("JetBrainsMono-Medium.woff")]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0A0C0E", color: INK, padding: "56px 64px", fontFamily: "Figtree", position: "relative" }}>
        {/* glow */}
        <div style={{ position: "absolute", right: -120, bottom: -260, width: 720, height: 560, borderRadius: 9999, background: "radial-gradient(circle, rgba(203,255,0,0.16) 0%, rgba(203,255,0,0) 62%)", display: "flex" }} />

        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="7" r="2.4" fill={LIME} />
            <path d="M7.4 7h4.1a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 0 2.5 2.5h0.1" stroke={LIME} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="19" cy="17" r="2.4" fill={LIME} />
          </svg>
          <div style={{ fontFamily: "Bricolage Grotesque", fontSize: 30, letterSpacing: -0.6 }}>Superstables</div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 54 }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontSize: 84, lineHeight: 0.98, letterSpacing: -3, display: "flex", flexWrap: "wrap" }}>
            <span>The payment router</span>
          </div>
          <div style={{ fontFamily: "Bricolage Grotesque", fontSize: 84, lineHeight: 0.98, letterSpacing: -3, display: "flex", gap: 22 }}>
            <span>for</span>
            <span style={{ color: LIME }}>AI agents.</span>
          </div>
          <div style={{ fontSize: 27, color: INK2, marginTop: 26, maxWidth: 900, lineHeight: 1.35 }}>
            Any rail, any chain, any stablecoin. Non-custodial, open source, no subscriptions.
          </div>
        </div>

        {/* terminal line */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto", fontFamily: "JetBrains Mono", fontSize: 19, color: INK2, background: "#07090B", border: `1px solid ${LINE}`, borderRadius: 8, padding: "14px 20px", alignSelf: "flex-start" }}>
          <span style={{ color: INK3 }}>$</span>
          <span style={{ color: INK }}>superstables pay</span>
          <span style={{ color: "#D4E6A5" }}>api.example.com/v1/prices</span>
          <span style={{ color: "#9ED1FF" }}>--max 0.05 USDC</span>
          <span style={{ color: INK3 }}>→</span>
          <span style={{ color: LIME }}>settled</span>
          <span style={{ color: INK3 }}>solana · $0.0004</span>
        </div>

        {/* chips */}
        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          {chips.flat().map((c, i) => (
            <div key={c} style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 16, color: i < 4 ? INK : INK2, border: `1px solid ${LINE}`, borderRadius: 5, padding: "6px 11px" }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 600, style: "normal" },
        { name: "Figtree", data: body, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
