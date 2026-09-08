import "server-only";
import { displayPrice, priceFromAtomic, type RawService, type Rail } from "./normalize";

/**
 * Source fetchers. Each returns RawService[] and throws on hard failure; the
 * pipeline catches per source so one broken directory never kills the run.
 * Shapes are best-effort until first contact (briefing §9) — keep raw blobs.
 */

const UA = "SuperstablesCrawler/0.1 (+https://www.superstables.com)";
const jfetch = async (url: string, init?: RequestInit) => {
  const res = await fetch(url, { ...init, headers: { "User-Agent": UA, Accept: "application/json", ...init?.headers }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

const asArray = (x: unknown): Record<string, unknown>[] => {
  if (Array.isArray(x)) return x as Record<string, unknown>[];
  if (x && typeof x === "object") {
    for (const k of ["items", "services", "resources", "data", "results", "list"]) {
      const v = (x as Record<string, unknown>)[k];
      if (Array.isArray(v)) return v as Record<string, unknown>[];
    }
  }
  return [];
};
const str = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : undefined);

/** #1 x402 Bazaar (Coinbase CDP). items[].{resource, accepts[], metadata}. Paginated. */
export async function fetchBazaar(): Promise<RawService[]> {
  const base = "https://api.cdp.coinbase.com/platform/v2/x402/discovery/resources";
  const out: RawService[] = [];
  const limit = 100;
  for (let offset = 0, page = 0; page < 250; page++, offset += limit) {
    const data: Record<string, unknown> = await jfetch(`${base}?limit=${limit}&offset=${offset}`);
    const items = asArray(data);
    if (items.length === 0) break;
    for (const it of items) {
      const endpoint = str(it.resource) ?? str(it.url) ?? str(it.endpoint);
      if (!endpoint) continue;
      const accepts = Array.isArray(it.accepts) ? (it.accepts as Record<string, unknown>[]) : [];
      const meta = (it.metadata ?? {}) as Record<string, unknown>;
      const first = accepts[0] ?? {};
      out.push({
        source: "x402-bazaar",
        sourceUrl: "https://www.x402.org/ecosystem",
        raw: it,
        name: str(meta.name) ?? str(meta.title) ?? str(it.name),
        category: str(meta.category) ?? str(meta.type),
        description: str(meta.description) ?? str(it.description),
        endpoint,
        rails: ["x402"],
        chains: accepts.map((a) => str(a.network)).filter(Boolean) as string[],
        assets: accepts.map((a) => str(a.asset) ?? str(a.extra && (a.extra as Record<string, unknown>).name)).filter(Boolean) as string[],
        priceUsd: priceFromAtomic(str(first.maxAmountRequired) ?? (first.maxAmountRequired as number | undefined)),
        priceDisplay: displayPrice(priceFromAtomic(str(first.maxAmountRequired) ?? (first.maxAmountRequired as number | undefined))),
        facilitator: "cdp",
      });
    }
    const pag = (data.pagination ?? {}) as Record<string, unknown>;
    const total = typeof pag.total === "number" ? pag.total : Infinity;
    if (offset + limit >= total) break;
  }
  return out;
}

/** #2 x402-list.com — independent, has its own uptime data; we re-probe ourselves. */
export async function fetchX402List(): Promise<RawService[]> {
  const data = await jfetch("https://x402-list.com/api/v1/services");
  return asArray(data).flatMap((it) => {
    const endpoint = str(it.base_url) ?? str(it.endpoint) ?? str(it.url);
    if (!endpoint) return [];
    const chains = (Array.isArray(it.networks_caip2) ? (it.networks_caip2 as string[]) : Array.isArray(it.networks) ? (it.networks as string[]) : []).filter(Boolean);
    const priceUsd = typeof it.min_price_usd === "number" ? (it.min_price_usd as number) : null;
    return [{
      source: "x402-list",
      sourceUrl: str(it.website_url) ?? `https://x402-list.com/${str(it.slug) ?? ""}`,
      raw: it,
      name: str(it.name) ?? str(it.slug),
      category: str(it.category),
      description: str(it.description),
      endpoint,
      rails: ["x402"] as Rail[],
      chains,
      assets: ["USDC"],
      priceUsd,
      priceDisplay: priceUsd != null ? displayPrice(priceUsd) : null,
      facilitator: str(it.facilitator),
    }];
  });
}

/** #3 mpp.dev — generated from a public repo; try the raw JSON in likely locations. */
export async function fetchMppDev(): Promise<RawService[]> {
  const candidates = [
    "https://raw.githubusercontent.com/machine-payments/mpp.dev/main/data/services.json",
    "https://raw.githubusercontent.com/machine-payments/mpp.dev/main/services.json",
    "https://mpp.dev/services.json",
    "https://mpp.dev/api/services",
    "https://mpp.dev/data/services.json",
  ];
  let data: unknown = null;
  let hit = "";
  for (const url of candidates) {
    try {
      data = await jfetch(url);
      hit = url;
      break;
    } catch {
      /* next candidate */
    }
  }
  if (!data) throw new Error("mpp.dev: no JSON feed found at known locations");
  return asArray(data).flatMap((it) => {
    const endpoint = str(it.endpoint) ?? str(it.url) ?? str(it.base_url);
    if (!endpoint) return [];
    return [{
      source: "mpp.dev",
      sourceUrl: hit,
      raw: it,
      name: str(it.name),
      category: str(it.category) ?? str(it.type),
      description: str(it.description) ?? str(it.summary),
      endpoint,
      rails: ["mpp"] as Rail[],
      chains: [str(it.network) ?? str(it.chain) ?? "tempo"].filter(Boolean) as string[],
      assets: [str(it.asset) ?? str(it.currency) ?? "USDC"].filter(Boolean) as string[],
      priceDisplay: str(it.price) ?? str(it.pricing),
      priceUsd: typeof it.price_usd === "number" ? (it.price_usd as number) : null,
      facilitator: str(it.facilitator) ?? "stripe",
    }];
  });
}

/** #4 MPPScan — check for a JSON feed; scraping is a later fallback. */
export async function fetchMppScan(): Promise<RawService[]> {
  const candidates = ["https://mppscan.com/api/services", "https://www.mppscan.com/api/services", "https://mppscan.com/api/v1/services", "https://mppscan.com/services.json"];
  let data: unknown = null;
  let hit = "";
  for (const url of candidates) {
    try {
      data = await jfetch(url);
      hit = url;
      break;
    } catch {
      /* next candidate */
    }
  }
  if (!data) throw new Error("mppscan: no JSON feed found");
  return asArray(data).flatMap((it) => {
    const endpoint = str(it.endpoint) ?? str(it.url);
    if (!endpoint) return [];
    return [{
      source: "mppscan",
      sourceUrl: hit,
      raw: it,
      name: str(it.name),
      category: str(it.category),
      endpoint,
      rails: ["mpp"] as Rail[],
      chains: [str(it.network) ?? "tempo"].filter(Boolean) as string[],
      assets: [str(it.asset) ?? "USDC"].filter(Boolean) as string[],
      priceDisplay: str(it.price),
      facilitator: str(it.facilitator),
    }];
  });
}

/** #5 Binance B402 Bazaar — same blob shape as CDP's (briefing). */
export async function fetchB402(): Promise<RawService[]> {
  const candidates = [
    "https://api.binance.com/api/b402/discovery/resources",
    "https://www.binance.com/bapi/b402/v1/discovery/resources",
  ];
  let data: unknown = null;
  for (const url of candidates) {
    try {
      data = await jfetch(url);
      break;
    } catch {
      /* next */
    }
  }
  if (!data) throw new Error("b402: no feed found");
  return asArray(data).flatMap((it) => {
    const endpoint = str(it.resource) ?? str(it.url);
    if (!endpoint) return [];
    const accepts = Array.isArray(it.accepts) ? (it.accepts as Record<string, unknown>[]) : [];
    return [{
      source: "b402-bazaar",
      raw: it,
      name: str((it.metadata as Record<string, unknown> | undefined)?.name),
      endpoint,
      rails: ["x402"] as Rail[],
      chains: accepts.map((a) => str(a.network)).filter(Boolean) as string[],
      assets: accepts.map((a) => str(a.asset)).filter(Boolean) as string[],
      priceUsd: priceFromAtomic(str(accepts[0]?.maxAmountRequired)),
      facilitator: "binance",
    }];
  });
}

export const SOURCES: { name: string; fetch: () => Promise<RawService[]> }[] = [
  { name: "x402-bazaar", fetch: fetchBazaar },
  { name: "x402-list", fetch: fetchX402List },
  { name: "mpp.dev", fetch: fetchMppDev },
  { name: "mppscan", fetch: fetchMppScan },
  { name: "b402-bazaar", fetch: fetchB402 },
];

/** Approved self-submissions become a source too, so they flow through the same pipeline. */
export function submissionToRaw(sub: { endpoint: string; name: string | null }): RawService {
  return {
    source: "self-submitted",
    raw: sub,
    name: sub.name ?? undefined,
    endpoint: sub.endpoint,
    rails: ["x402"],
    chains: [],
    assets: [],
  };
}
