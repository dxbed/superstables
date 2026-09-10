"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/app/Icon";

export type ServiceRow = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  rails: string[];
  chains: string[];
  assets: string[];
  price: { display: string | null; usd: number | null };
  endpoint: string;
  live: boolean | null;
  last_seen_live: string | null;
};

const RAILS = ["all", "x402", "mpp", "acp"] as const;
const CHAINS = ["", "base", "solana", "tempo", "ethereum", "polygon", "robinhood"];
const ASSETS = ["", "USDC", "EURC", "USDT", "PYUSD", "USDG"];

function ago(iso: string | null): string {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

/** First few words of the description, for the table row. Full text lives on the service page. */
function blurb(s: ServiceRow): string | null {
  const src = s.description ?? s.category;
  if (!src) return null;
  const words = src.replace(/\s+/g, " ").trim().split(" ");
  return words.slice(0, 4).join(" ") + (words.length > 4 ? "…" : "");
}

type SortKey = "name" | "price" | "status";

function SortTh({ label, active, dir, num, onClick }: { label: string; active: boolean; dir: 1 | -1; num?: boolean; onClick: () => void }) {
  return (
    <th className={num ? "num" : undefined} aria-sort={active ? (dir === 1 ? "ascending" : "descending") : "none"}>
      <button type="button" className="dir-sort" onClick={onClick}>
        {label}
        <span className="arrow">{active ? (dir === 1 ? "\u2191" : "\u2193") : "\u2195"}</span>
      </button>
    </th>
  );
}

function CopyCell({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="dir-copy"
      aria-label="Copy endpoint URL"
      title={ok ? "Copied" : "Copy endpoint"}
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1200);
        } catch {
          /* ignore */
        }
      }}
    >
      <Icon name={ok ? "check" : "copy"} size={15} />
    </button>
  );
}

export default function DirectoryTable({ initial, total }: { initial: ServiceRow[]; total: number }) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [count, setCount] = useState(total);
  const [q, setQ] = useState("");
  const [rail, setRail] = useState<(typeof RAILS)[number]>("all");
  const [liveOnly, setLiveOnly] = useState(false);
  const [chain, setChain] = useState("");
  const [asset, setAsset] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<{ k: SortKey | null; d: 1 | -1 }>({ k: null, d: 1 });
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const ctl = new AbortController();
    const t = window.setTimeout(async () => {
      setLoading(true);
      const p = new URLSearchParams({ limit: "200" });
      if (q) p.set("q", q);
      if (rail !== "all") p.set("rail", rail);
      if (liveOnly) p.set("live", "true");
      if (chain) p.set("chain", chain);
      if (asset) p.set("asset", asset);
      try {
        const res = await fetch(`/api/v1/services?${p}`, { signal: ctl.signal });
        const data = await res.json();
        setRows(data.services);
        setCount(data.services.length < 200 ? data.services.length : data.counts.total);
      } catch {
        /* aborted or offline */
      }
      setLoading(false);
    }, 250);
    return () => {
      ctl.abort();
      window.clearTimeout(t);
    };
  }, [q, rail, liveOnly, chain, asset]);

  const go = (id: string) => router.push(`/s/${id}`);

  const sorted = useMemo(() => {
    if (!sort.k) return rows;
    const rank = (s: ServiceRow) => (s.live === true ? 2 : s.live === false ? 0 : 1);
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sort.k === "name") cmp = a.name.localeCompare(b.name);
      if (sort.k === "price") {
        const pa = a.price.usd, pb = b.price.usd;
        cmp = pa == null && pb == null ? 0 : pa == null ? 1 : pb == null ? -1 : pa - pb; // unknown prices sink regardless of direction
        if (pa == null || pb == null) return cmp;
      }
      if (sort.k === "status") {
        cmp = rank(b) - rank(a);
        if (cmp === 0) cmp = (b.last_seen_live ?? "").localeCompare(a.last_seen_live ?? "");
      }
      return cmp * sort.d;
    });
    return copy;
  }, [rows, sort]);

  const onSort = (k: SortKey) =>
    setSort((s) => (s.k === k ? (s.d === 1 ? { k, d: -1 } : { k: null, d: 1 }) : { k, d: 1 }));

  return (
    <>
      <div className="dir-filters">
        <label className="search">
          <input placeholder="Search services, categories, endpoints" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search services" />
        </label>
        <div className="seg" role="tablist" aria-label="Rail">
          {RAILS.map((r) => (
            <button key={r} className={rail === r ? "on" : ""} onClick={() => setRail(r)}>
              {r === "all" ? "All rails" : r.toUpperCase()}
            </button>
          ))}
        </div>
        <select value={chain} onChange={(e) => setChain(e.target.value)} aria-label="Chain">
          {CHAINS.map((c) => <option key={c} value={c}>{c === "" ? "Any chain" : c}</option>)}
        </select>
        <select value={asset} onChange={(e) => setAsset(e.target.value)} aria-label="Asset">
          {ASSETS.map((a) => <option key={a} value={a}>{a === "" ? "Any asset" : a}</option>)}
        </select>
        <label className="dir-live-toggle">
          <input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} /> Live only
        </label>
      </div>

      <div className="panel dir-panel" aria-busy={loading}>
        <div className="tbl-wrap">
          <table className="tbl dir-tbl">
            <thead>
              <tr>
                <SortTh label="Service" active={sort.k === "name"} dir={sort.d} onClick={() => onSort("name")} />
                <th>Rails</th>
                <th>Chains</th>
                <th>Asset</th>
                <SortTh label="Price" num active={sort.k === "price"} dir={sort.d} onClick={() => onSort("price")} />
                <SortTh label="Status" active={sort.k === "status"} dir={sort.d} onClick={() => onSort("status")} />
                <th aria-label="Copy endpoint" />
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--ink-2)", padding: 40 }}>Nothing matches those filters.</td></tr>
              )}
              {sorted.map((s) => (
                <tr
                  key={s.id}
                  className="dir-row"
                  tabIndex={0}
                  onClick={() => go(s.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(s.id); } }}
                >
                  <td className="dir-svc"><b>{s.name}</b>{blurb(s) && <span className="dir-cat">{blurb(s)}</span>}</td>
                  <td><span className="chiprow">{s.rails.map((r) => <span key={r} className={`pill soft rail-${r}`}>{r.toUpperCase()}</span>)}</span></td>
                  <td className="mono dir-chains">{s.chains.slice(0, 2).join(", ")}{s.chains.length > 2 ? ` +${s.chains.length - 2}` : ""}</td>
                  <td className="mono">{s.assets.slice(0, 2).join(", ")}{s.assets.length > 2 ? ` +${s.assets.length - 2}` : ""}</td>
                  <td className="num mono">{s.price.display ?? ""}</td>
                  <td className="dir-status">
                    {s.live === true ? <span className="pill ok">■ Live</span> : s.live === false ? <span className="pill">□ Not responding</span> : <span className="pill soft">Not probed</span>}
                    <span className="dir-ago" suppressHydrationWarning>{ago(s.last_seen_live)}</span>
                  </td>
                  <td className="dir-copy-cell"><CopyCell text={s.endpoint} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">{count.toLocaleString("en-US")} services{rows.length < count ? ` · showing ${rows.length}` : ""} · updated every 6 hours</div>
      </div>
    </>
  );
}
