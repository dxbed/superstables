/** Demo catalogue and sample activity for the review build. No real money moves here. */

export const WALLET_BACKENDS = [
  { id: "coinbase", name: "Coinbase Agentic Wallet", desc: "Non-custodial smart wallet with on-chain spend caps. Base and Solana.", tag: "CB" },
  { id: "crossmint", name: "Crossmint", desc: "Smart wallets with policy controls. Base, Solana, Tempo.", tag: "CM" },
  { id: "turnkey", name: "Turnkey", desc: "Key management with programmable policies. All supported chains.", tag: "TK" },
  { id: "import", name: "Import an existing wallet", desc: "Bring a smart-contract wallet you already run. We never see the key.", tag: "0x" },
];

export const CHAINS = ["Base", "Solana", "Tempo", "Arc"] as const;
export const STABLES = ["USDC", "EURC", "USDT", "PYUSD"] as const;
export const PROTOCOLS = ["x402", "Stripe MPP", "Google AP2", "Virtuals ACP"] as const;

export const FACILITATORS = [
  { name: "Coinbase facilitator", protocol: "x402", chains: ["Base", "Solana"], fee: "0.0004 to 0.0011", health: "ok" },
  { name: "Stripe MPP", protocol: "Stripe MPP", chains: ["Tempo"], fee: "0.0009", health: "ok" },
  { name: "AP2 mandate gateway", protocol: "Google AP2", chains: ["Base"], fee: "0.0012", health: "ok" },
  { name: "Virtuals ACP", protocol: "Virtuals ACP", chains: ["Base"], fee: "0.0020", health: "degraded" },
];

export const SERVICES = [
  { name: "Nosana GPU compute", url: "api.nosana.io/v1/jobs", kind: "compute", protocol: "x402", chain: "Solana", stable: "USDC", price: "0.12 / min", latency: "420ms", uptime: "99.4%", rep: 92 },
  { name: "Akash deployments", url: "api.akash.network/deploy", kind: "compute", protocol: "x402", chain: "Base", stable: "USDC", price: "0.08 / min", latency: "610ms", uptime: "98.9%", rep: 88 },
  { name: "io.net cluster", url: "api.io.net/v1/clusters", kind: "compute", protocol: "Stripe MPP", chain: "Tempo", stable: "USDC", price: "0.10 / min", latency: "380ms", uptime: "99.1%", rep: 85 },
  { name: "Market prices", url: "api.example.com/v1/prices", kind: "data", protocol: "x402", chain: "Base", stable: "USDC", price: "0.01 / call", latency: "190ms", uptime: "99.9%", rep: 97 },
  { name: "Weather forecast", url: "weather.example.dev/v2/forecast", kind: "data", protocol: "Google AP2", chain: "Base", stable: "EURC", price: "0.005 / call", latency: "240ms", uptime: "99.7%", rep: 90 },
  { name: "Web search", url: "search.example.ai/query", kind: "data", protocol: "x402", chain: "Solana", stable: "USDC", price: "0.004 / call", latency: "310ms", uptime: "99.5%", rep: 94 },
  { name: "Document OCR", url: "ocr.example.io/v1/extract", kind: "tool", protocol: "Stripe MPP", chain: "Tempo", stable: "USDT", price: "0.02 / page", latency: "1.2s", uptime: "98.2%", rep: 81 },
  { name: "Research agent", url: "acp.virtuals.io/agents/research", kind: "agent", protocol: "Virtuals ACP", chain: "Base", stable: "USDC", price: "0.25 / task", latency: "8s", uptime: "96.0%", rep: 74 },
];

export type Txn = {
  id: string;
  at: string;
  service: string;
  protocol: string;
  chain: string;
  stable: string;
  amount: number;
  fee: number;
  status: "settled" | "failed" | "pending";
  key: string;
  ms: number;
};

const hours = (n: number) => new Date(Date.now() - n * 3600_000).toISOString();

export const SAMPLE_TXNS: Txn[] = [
  { id: "5Kq9wP2t", at: hours(1), service: "api.example.com/v1/prices", protocol: "x402", chain: "Solana", stable: "USDC", amount: 0.0104, fee: 0.0004, status: "settled", key: "Default key", ms: 412 },
  { id: "3f9ae2c1", at: hours(3), service: "search.example.ai/query", protocol: "x402", chain: "Solana", stable: "USDC", amount: 0.004, fee: 0.0004, status: "settled", key: "Default key", ms: 388 },
  { id: "8ab1c0d4", at: hours(5), service: "api.nosana.io/v1/jobs", protocol: "x402", chain: "Solana", stable: "USDC", amount: 1.44, fee: 0.0004, status: "settled", key: "Default key", ms: 1210 },
  { id: "c7e2f119", at: hours(9), service: "weather.example.dev/v2/forecast", protocol: "Google AP2", chain: "Base", stable: "EURC", amount: 0.005, fee: 0.0012, status: "settled", key: "Default key", ms: 640 },
  { id: "1d44b9aa", at: hours(14), service: "ocr.example.io/v1/extract", protocol: "Stripe MPP", chain: "Tempo", stable: "USDT", amount: 0.06, fee: 0.0009, status: "settled", key: "Default key", ms: 1530 },
  { id: "9e01aa27", at: hours(20), service: "acp.virtuals.io/agents/research", protocol: "Virtuals ACP", chain: "Base", stable: "USDC", amount: 0.25, fee: 0.002, status: "failed", key: "Default key", ms: 9020 },
  { id: "f2c38e10", at: hours(27), service: "api.example.com/v1/prices", protocol: "x402", chain: "Base", stable: "USDC", amount: 0.0104, fee: 0.0011, status: "settled", key: "Default key", ms: 1880 },
  { id: "72de5b03", at: hours(40), service: "api.akash.network/deploy", protocol: "x402", chain: "Base", stable: "USDC", amount: 0.96, fee: 0.0011, status: "settled", key: "Default key", ms: 2100 },
];

export const SOURCES = ["X / Twitter", "GitHub", "LinkedIn", "YouTube", "Newsletter", "Hackathon or conference", "Friend or colleague", "Google", "ChatGPT, Perplexity or Claude", "MCP registry", "Other or not sure"];
