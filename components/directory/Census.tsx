import Link from "next/link";

export type Stats = { total: number; live: number; probed: number; dual_rail: number; rails: number; last_probe_at: string | null };

/** The census hero: real numbers, one sentence (briefing §7). */
export default function Census({ stats }: { stats: Stats }) {
  return (
    <header className="dir-hero">
      <h1>
        Right now, <em>{stats.live.toLocaleString("en-US")}</em> of <em>{stats.total.toLocaleString("en-US")}</em> listed services answer a valid payment challenge.
      </h1>
      <p className="dir-sub">
        The neutral index of what an AI agent can pay for and earn on with stablecoins, from data and compute to RWA yield and tokenized stocks: {stats.rails} rails, one directory, every endpoint probed by us.{" "}
        {stats.dual_rail > 0 && <>{stats.dual_rail} accept more than one rail.</>}{" "}
        <a className="link" href="https://www.superstables.com/api/v1/services">Query it as JSON</a> or <Link className="link" href="/submit">list your service</Link>.
      </p>
    </header>
  );
}
