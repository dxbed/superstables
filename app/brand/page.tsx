import type { Metadata } from "next";
import { LogoMark, Lockup } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Superstables — Brand",
  robots: { index: false },
};

const tile: React.CSSProperties = {
  borderRadius: 6,
  padding: "clamp(28px, 4vw, 56px)",
  display: "flex",
  flexDirection: "column",
  gap: 28,
  border: "1px solid var(--line-2)",
};

function Row({ variant }: { variant: "dark" | "light" }) {
  const fg = variant === "dark" ? "#98A39A" : "#5E6862";
  return (
    <div
      style={{
        ...tile,
        background: variant === "dark" ? "#0A0C0E" : "#F4F6F1",
        color: variant === "dark" ? "#E9EDE6" : "#0A0C0E",
      }}
    >
      <span className="eyebrow plain" style={{ color: fg }}>
        {variant} ground
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
        <LogoMark variant={variant} size={96} />
        <LogoMark variant={variant} size={48} />
        <LogoMark variant={variant} size={24} />
        <LogoMark variant={variant} size={16} />
      </div>
      <div style={{ fontSize: 34 }}>
        <Lockup variant={variant} size={34} />
      </div>
      <div style={{ display: "flex", gap: 16, fontFamily: "var(--mono)", fontSize: 12.5, color: fg }}>
        <a href={`/brand/superstables-mark-${variant}.svg`} download>
          mark-{variant}.svg ↓
        </a>
        <a href={`/brand/superstables-lockup-${variant}.svg`} download>
          lockup-{variant}.svg ↓
        </a>
      </div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <main className="wrap" style={{ padding: "64px 0 96px", display: "grid", gap: 24 }}>
      <div>
        <span className="eyebrow plain">Brand</span>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", marginTop: 12 }}>Logo</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          A payment leaving one node, routed through a bend, arriving at another — and, read quickly, an S. Use the
          dark version on dark grounds and the light version on light grounds; never recolour the route.
        </p>
      </div>
      <Row variant="dark" />
      <Row variant="light" />
    </main>
  );
}
