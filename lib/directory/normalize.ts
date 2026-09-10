/**
 * Normalization: every source mapper emits RawService; this module cleans it into
 * the services-table shape. Rules ported from the V0 briefing (§5).
 */

export type Rail = "x402" | "mpp" | "acp";

export type RawService = {
  source: string;
  sourceUrl?: string;
  raw: unknown;
  name?: string;
  category?: string;
  description?: string;
  endpoint: string;
  rails: Rail[];
  chains?: string[];
  assets?: string[];
  priceDisplay?: string | null;
  priceUsd?: number | null;
  facilitator?: string;
};

export type NormalService = Required<Pick<RawService, "endpoint" | "rails">> & {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  chains: string[];
  assets: string[];
  priceDisplay: string | null;
  priceUsd: number | null;
  facilitator: string | null;
  sources: { source: string; sourceUrl: string | null; raw: unknown }[];
};

/** CAIP-2 and vernacular chain ids -> our short names. */
const CHAIN_ALIASES: Record<string, string> = {
  "eip155:8453": "base",
  "eip155:84532": "base-sepolia",
  "eip155:1": "ethereum",
  "eip155:137": "polygon",
  "eip155:10": "optimism",
  "eip155:42161": "arbitrum",
  "eip155:43114": "avalanche",
  "eip155:56": "bnb",
  base: "base",
  "base-mainnet": "base",
  "base-sepolia": "base-sepolia",
  solana: "solana",
  "solana-mainnet": "solana",
  "solana:5eykt4usfv8p8njdtrepy1vzqkqzkvdp": "solana",
  tempo: "tempo",
  polygon: "polygon",
  ethereum: "ethereum",
  mainnet: "ethereum",
  optimism: "optimism",
  arbitrum: "arbitrum",
  avalanche: "avalanche",
  bnb: "bnb",
  bsc: "bnb",
  sei: "sei",
  iotex: "iotex",
  robinhood: "robinhood",
  "robinhood-chain": "robinhood",
};

export function normChain(v: string | undefined | null): string | null {
  if (!v) return null;
  const k = String(v).trim().toLowerCase();
  if (CHAIN_ALIASES[k]) return CHAIN_ALIASES[k];
  if (k.startsWith("solana:")) return "solana";
  if (k.startsWith("eip155:")) return k; // unknown EVM chain: keep the CAIP id rather than guessing
  return k;
}

/** Known stablecoin contract addresses -> symbol. Extend on first contact when EURC appears. */
const ASSET_BY_ADDRESS: Record<string, string> = {
  // USDC
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913": "USDC", // base
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC", // ethereum
  "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359": "USDC", // polygon
  epjfwdd5aufqssqem2qn1xzybapc8g4weggkzwytdt1v: "USDC", // solana
  // EURC
  "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42": "EURC", // base
  "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c": "EURC", // ethereum
  // USDT
  "0xdac17f958d2ee523a2206206994597c13d831ec7": "USDT", // ethereum
  es9vmfrzacermjfrf4h2fyd4kconky11mcce8benwnyb: "USDT", // solana
  // PYUSD
  "0x6c3ea9036406852006290770bedfcaba0e23a0e8": "PYUSD",
};

export function normAsset(v: string | undefined | null): string | null {
  if (!v) return null;
  const k = String(v).trim();
  const up = k.toUpperCase();
  if (["USDC", "EURC", "USDT", "PYUSD", "USDG", "DAI", "USDS"].includes(up)) return up;
  const byAddr = ASSET_BY_ADDRESS[k.toLowerCase()];
  if (byAddr) return byAddr;
  if (k.startsWith("0x") || k.length > 30 || /^\d+$/.test(k)) return "USDC"; // unmapped contract or numeric asset id: assume USDC
  return up;
}

/** Atomic units with 6 decimals (USDC/EURC) -> USD number. */
export function priceFromAtomic(amount: string | number | undefined | null, decimals = 6): number | null {
  if (amount == null || amount === "") return null;
  const n = Number(amount);
  if (!Number.isFinite(n)) return null;
  return n / 10 ** decimals;
}

export function displayPrice(usd: number | null): string | null {
  if (usd == null) return null;
  if (usd === 0) return "free";
  if (usd < 0.01) return `$${usd.toFixed(6).replace(/0+$/, "").replace(/\.$/, "")} / call`;
  return `$${usd.toFixed(usd < 1 ? 4 : 2).replace(/0+$/, "").replace(/\.$/, "")} / call`;
}

export function hostOf(endpoint: string): string | null {
  try {
    if (endpoint.includes("://") && !endpoint.startsWith("http")) {
      // acp:// and friends: scheme + first path token is the identity
      const rest = endpoint.split("://")[1] ?? "";
      return `${endpoint.split("://")[0]}://${rest.split(/[/?#]/)[0].toLowerCase()}`;
    }
    return new URL(endpoint.startsWith("http") ? endpoint : `https://${endpoint}`).host.toLowerCase();
  } catch {
    return null;
  }
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/^https?:\/\//, "").replace(/[^a-z0-9.:-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

const dedupeSorted = (xs: (string | null | undefined)[]) => [...new Set(xs.filter((x): x is string => Boolean(x)))].sort();

/**
 * Dedupe on endpoint host: the same host reported by two sources is one service
 * with the union of rails/chains/assets/sources. Deliberately crude (briefing §5).
 */
export function dedupe(raws: RawService[]): NormalService[] {
  const byHost = new Map<string, RawService[]>();
  for (const r of raws) {
    const host = hostOf(r.endpoint);
    if (!host) continue;
    byHost.set(host, [...(byHost.get(host) ?? []), r]);
  }
  const out: NormalService[] = [];
  for (const [host, group] of byHost) {
    const primary = group.find((g) => g.name) ?? group[0];
    const priceUsd = group.map((g) => g.priceUsd).find((p) => p != null) ?? null;
    out.push({
      id: slugify(host),
      name: (primary.name || host).slice(0, 200),
      category: group.map((g) => g.category).find(Boolean)?.slice(0, 100) ?? null,
      description: group.map((g) => g.description).find(Boolean)?.slice(0, 500) ?? null,
      endpoint: primary.endpoint,
      rails: dedupeSorted(group.flatMap((g) => g.rails)) as Rail[],
      chains: dedupeSorted(group.flatMap((g) => g.chains ?? []).map(normChain)),
      assets: dedupeSorted(group.flatMap((g) => g.assets ?? []).map(normAsset)),
      priceDisplay: group.map((g) => g.priceDisplay).find(Boolean) ?? displayPrice(priceUsd),
      priceUsd,
      facilitator: group.map((g) => g.facilitator).find(Boolean)?.toLowerCase() ?? null,
      sources: group.map((g) => ({ source: g.source, sourceUrl: g.sourceUrl ?? null, raw: g.raw })),
    });
  }
  return out;
}
