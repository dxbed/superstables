/**
 * Editable site content. Keep copy here so components stay structural.
 */

export const site = {
  name: "Superstables",
  tagline: "The payment router for AI agents.",
  installCmd: "npm i -g superstables",
  links: {
    github: "#",
    npm: "#",
    pypi: "#",
    mcp: "#",
    status: "#",
    blog: "#",
    x: "#",
    contact: "#",
  },
};

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
];

export const steps = [
  {
    title: "Detect",
    body: "Hit any URL. The router reads the 402 challenge, the MPP session, or the AP2 mandate and figures out what the endpoint speaks, on which chain, in which stablecoin.",
  },
  {
    title: "Route",
    body: "Every live facilitator is quoted on fee, latency and health. The cheapest compliant path wins; if a rail drops mid-payment, the router fails over instead of failing.",
  },
  {
    title: "Settle, never hold",
    body: "Payments are signed from the agent's own smart-contract wallet. Superstables never holds funds — the policy and the ledger are the product, not custody.",
  },
];

export const guards = [
  { k: "caps", title: "Per-call, session and daily limits", body: "Set once by the principal; the wallet refuses anything above them, whatever the agent was told." },
  { k: "lists", title: "Allow and deny by domain", body: "Pay only the services you've approved. Unknown counterparties never get a signature." },
  { k: "approvals", title: "Human-in-the-loop above a threshold", body: "Large spends pause for a tap on your phone. Small ones flow at machine speed." },
  { k: "kill switch", title: "Stop everything, instantly", body: "One click revokes the agent's signing rights across every rail and chain at once. Anomaly alerts tell you when to use it." },
];

export const principles = [
  { label: "Non-custodial", value: "day one" },
  { label: "Open source core", value: "Apache 2.0" },
  { label: "No token", value: "ever" },
  { label: "Multi-stablecoin", value: "no USDC lock-in" },
  { label: "Public metrics", value: "verifiable" },
  { label: "EU-first compliance", value: "MiCA" },
];

export const phases = [
  {
    idx: "Phase 1",
    window: "Nov 2026 → Apr 2027",
    title: "Router",
    now: true,
    items: [
      "CLI, TypeScript & Python SDK, MCP server",
      "x402, Stripe MPP, Google AP2 — 3+ rails",
      "Base, Solana, Tempo · USDC, EURC, USDT",
      "Discovery index incl. DePIN compute",
      "Live routing on fee, latency and health",
      "Security audit of the pay path",
    ],
    gate: "1,000+ weekly-active installs; routed transactions growing week over week.",
  },
  {
    idx: "Phase 2",
    window: "May 2027 → Apr 2028",
    title: "Treasury",
    now: false,
    items: [
      "Agent-held smart-contract treasury wallets",
      "Self-payment streams: salary, runway",
      "Subscriptions and recurring billing",
      "Auto-conversion between stablecoins",
      "Audit log, CSV, Xero and QuickBooks exports",
      "Multi-agent orgs, roles, SSO, KYT screening",
    ],
    gate: "Meaningful treasury under management; net revenue retention above 120%.",
  },
  {
    idx: "Phase 3",
    window: "May 2028 → Aug 2029",
    title: "Passport",
    now: false,
    items: [
      "Know-your-agent attestations tied to a principal",
      "Sybil-resistant, stake-weighted reputation",
      "ERC-8004 / 8183, Visa TAP, Mastercard Agent Pay compatible",
      "EURC-native flows, Travel Rule, MiCA reporting",
      "EMI licence or bank partnership in Portugal",
      "Fiat on/off-ramps through partners",
    ],
    gate: "Regulated status secured; reputation layer adopted by third parties.",
  },
];

export const stats = [
  { value: "$73", unit: "M", label: "settled by agents on-chain in the twelve months to April 2026" },
  { value: "176", unit: "M", label: "machine-to-machine transactions in that period" },
  { value: "98.6", unit: "%", label: "of it in USDC — a concentration worth routing around" },
  { value: "$0.31", unit: "–0.48", label: "average ticket, below the fee floor of any card network" },
];

export const lisbon = [
  { k: "MiCA", body: "Fully enforced since July 2026. Compliance is slow and expensive to acquire — a moat that money alone doesn't buy quickly, and one every US incumbent is behind on." },
  { k: "EURC", body: "Euro stablecoins are under-served and no agent-payment product is EURC-native. We route EURC as a first-class asset from day one." },
  { k: "Licensing", body: "EMI licensing through Banco de Portugal, pursued in Phase 3 once traction justifies the 12–18 months it takes." },
  { k: "Ecosystem", body: "ETHLisbon, Web Summit, a deep crypto and AI talent pool, and EU instruments built for infrastructure plays." },
];
