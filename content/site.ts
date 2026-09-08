/**
 * Editable site content. Keep copy here so components stay structural.
 */

export const site = {
  name: "Superstables",
  tagline: "The payment router for AI agents.",
  installCmd: "npm i -g superstables",
  links: {
    github: "https://github.com/dxbed/superstables",
    npm: "#",
    pypi: "#",
    mcp: "#",
    status: "#",
    x: "https://x.com/superstables",
  },
};

/** The token's contract address on Robinhood Chain. Set it here the moment it exists; /contract renders it. */
export const tokenContract: string | null = null;

export const rails = [
  { name: "x402", kind: "protocol" },
  { name: "Stripe MPP", kind: "protocol" },
  { name: "Google AP2", kind: "mandates" },
  { name: "Virtuals ACP", kind: "protocol" },
  { name: "Base", kind: "chain" },
  { name: "Solana", kind: "chain" },
  { name: "Tempo", kind: "chain" },
  { name: "Arc", kind: "chain" },
  { name: "USDC", kind: "stable" },
  { name: "EURC", kind: "stable" },
  { name: "USDT", kind: "stable" },
  { name: "PYUSD", kind: "stable" },
  { name: "USDG", kind: "stable" },
];

export const steps = [
  {
    title: "Detect",
    body: "Hit any URL. The router reads the 402 challenge, the MPP session, or the AP2 mandate and figures out what the endpoint speaks, on which chain, in which stablecoin.",
  },
  {
    title: "Route",
    body: "Each live facilitator is quoted on fee, latency and health, and the cheapest compliant path wins. If a rail drops mid-payment, the router moves the payment to the next one.",
  },
  {
    title: "Settle, never hold",
    body: "Payments are signed from the agent's own smart-contract wallet. Superstables never holds funds; it holds the spend policy and the receipts.",
  },
];

export const guards = [
  { k: "caps", title: "Per-call, session and daily limits", body: "Set once by the principal; the wallet refuses anything above them, whatever the agent was told." },
  { k: "lists", title: "Allow and deny by domain", body: "Pay only the services you've approved. Unknown counterparties never get a signature." },
  { k: "approvals", title: "Human-in-the-loop above a threshold", body: "Spends above your threshold wait for your approval; everything below it goes through without you." },
  { k: "kill switch", title: "Stop everything, instantly", body: "One click revokes the agent's signing rights across every rail and chain at once. Anomaly alerts tell you when to use it." },
];

export const principles = [
  { label: "Non-custodial", value: "day one" },
  { label: "Open source core", value: "Apache 2.0" },
  { label: "Multi-stablecoin", value: "no USDC lock-in" },
  { label: "Public metrics", value: "verifiable" },
  { label: "Compliance built in", value: "Phase 3" },
];

export const phases = [
  {
    idx: "Phase 0",
    window: "Live today",
    title: "Index",
    now: true,
    items: [
      "Every payable service across x402, MPP and ACP in one directory",
      "Independent liveness probes every few hours, history kept forever",
      "Public JSON API and OpenAPI spec, no key required",
      "MCP server and natural-language /ask endpoint",
      "Vendor self-listing with probe-before-publish",
    ],
    gate: "Shipped. 1,900+ services indexed and probed on a rolling schedule.",
  },
  {
    idx: "Phase 1",
    window: "In development",
    title: "Router",
    now: false,
    items: [
      "Open-source SDK, CLI and MCP server that sign locally",
      "pay(url, max) across x402, MPP and ACP",
      "Failover between facilitators when one goes down",
      "Spend caps enforced by the agent's own wallet",
      "The index becomes the router's map of where to pay",
    ],
    gate: "Ships after an external security audit of the pay path.",
  },
  {
    idx: "Phase 2",
    window: "Planned",
    title: "Control plane",
    now: false,
    items: [
      "Hosted ledger and accounting exports",
      "Policy dashboard: caps, allow lists, approvals, kill switch",
      "Treasury basics: revenue accounts, conversion, subscriptions",
      "Idle-balance yield: RWA vaults and tokenized stocks under policy",
      "Team seats and roles",
    ],
    gate: "Follows the router once teams run real volume through it.",
  },
  {
    idx: "Phase 3",
    window: "Later",
    title: "Trust",
    now: false,
    items: [
      "Know-your-agent attestations tied to an accountable principal",
      "Reputation grounded in verified paid interactions",
      "Regulatory reporting and licensed partners where required",
    ],
    gate: "Built with partners once the router has earned adoption.",
  },
];

export const stats = [
  { value: "$73", unit: "M", label: "settled by agents on-chain in the twelve months to April 2026" },
  { value: "176", unit: "M", label: "machine-to-machine transactions in that period" },
  { value: "98.6", unit: "%", label: "of it in USDC, a single point of failure we route around" },
  { value: "$0.31", unit: "–0.48", label: "average ticket, below the fee floor of any card network" },
];

