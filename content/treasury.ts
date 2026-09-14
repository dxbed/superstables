/**
 * Treasury page data. Updated by hand: edit the numbers and rows below,
 * bump lastUpdated, push. Mirrors the internal treasury sheet.
 */

export const treasury = {
  lastUpdated: "2026-09-14",
  nvdaPriceUsd: 218.29,

  /** Fee state on the pons pair (STBL/NVDA), in tokenized NVDA. */
  fees: {
    generatedNvda: 172.298292,
    pendingClaimNvda: 8.2,
    claimedNvda: 164.098292,
  },

  /** Cash position, USD. */
  cash: {
    claimedUsd: 35821.02,
    spentUsd: 19743.0,
    availableUsd: 16078.02,
  },

  wallets: [
    {
      label: "Token contract (STBL)",
      address: "0x79a74fd91f8e1c4ab8e76253dec5c91f3094393f",
      role: "The token. Trades against tokenized NVDA on Robinhood Chain; every trade carries the 1% fee this page accounts for.",
      link: { href: "https://www.ponsfamily.com/launchpad/0x79a74fd91f8e1c4ab8e76253dec5c91f3094393f", label: "View the pair on pons" },
    },
    {
      label: "Dev wallet",
      address: "0x1328b3d4fb7db40e0e3e72f0bde0fc45dcd9f0d9",
      role: "Rebuys STBL with part of the fees. Locked; unlock terms are on the Contract page.",
    },
    {
      label: "Marketing wallet",
      address: "0x0bbe2de46dbc1344f11f02e2444088b313d3a87a",
      role: "Buys and holds STBL for later use: exchange listings, marketing actions and similar.",
    },
  ],

  categories: [
    { name: "Operational / infra", usd: 10527.0 },
    { name: "Liquidity / market making", usd: 9116.0 },
    { name: "Marketing", usd: 100.0 },
  ],

  /** Newest first. */
  expenses: [
    { date: "2026-09-13", category: "Operational / infra", description: "Devs monthly payment (2 devs)", usd: 10000.0 },
    { date: "2026-09-12", category: "Liquidity / market making", description: "Bought 0.7% more of dev supply, locked for one year", usd: 3640.0 },
    { date: "2026-09-12", category: "Operational / infra", description: "Automated X posting (GitHub), at the dev's request", usd: 527.0 },
    { date: "2026-09-11", category: "Marketing", description: "DEX boosts (Dexscreener)", usd: 100.0 },
    { date: "2026-09-10", category: "Liquidity / market making", description: "Buyback from the 0x0bbe wallet, 0.9% of supply, at about $441k average market cap", usd: 5476.0 },
  ],
};
