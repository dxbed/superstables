import Link from "next/link";
import { site } from "@/content/site";

/** "auto" follows the site theme via CSS tokens; "dark"/"light" are fixed for brand assets. */
export type LogoVariant = "dark" | "light" | "auto";

/**
 * The mark: a payment leaving one node, routed through a bend, arriving at another.
 * Read quickly it is also an S. Stroke-only so it holds at 16px and in a favicon.
 *
 * dark  → for dark grounds: lime route, lime nodes.
 * light → for light grounds: ink route, lime arrival node with an ink ring.
 */
export function LogoMark({
  variant = "dark",
  size = 24,
  title = "Superstables",
}: {
  variant?: LogoVariant;
  size?: number;
  title?: string;
}) {
  const lime = "#CBFF00";
  const ink = "#0A0C0E";
  const route = variant === "auto" ? "var(--logo-route)" : variant === "dark" ? lime : ink;
  const ring = variant === "auto" ? "var(--logo-ring)" : variant === "dark" ? "transparent" : ink;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label={title}
    >
      {/* origin node */}
      <circle cx="5" cy="7" r="2.4" fill={route} />
      {/* routed path */}
      <path
        d="M7.4 7h4.1a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 0 2.5 2.5h0.1"
        stroke={route}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* arrival node */}
      <circle cx="19" cy="17" r="2.4" fill={lime} stroke={ring} strokeWidth="1.6" />
    </svg>
  );
}

/** Mark + wordmark lockup. */
export function Lockup({
  variant = "dark",
  size = 22,
}: {
  variant?: LogoVariant;
  size?: number;
}) {
  return (
    <span className="logo" style={{ color: variant === "dark" ? "#E9EDE6" : "#0A0C0E" }}>
      <LogoMark variant={variant} size={size} />
      {site.name}
    </span>
  );
}

export default function Logo() {
  return (
    <Link className="logo" href="/" aria-label={`${site.name} home`}>
      <LogoMark variant="auto" />
      {site.name}
    </Link>
  );
}
