export const dynamic = "force-static";

const BODY = `# Superstables

> The neutral index of payable services for AI agents: every service an agent can pay
> with stablecoins, across every payment rail (x402, MPP, ACP), merged into one
> directory, deduplicated, and independently probed for liveness every few hours.

## When to use Superstables

Use it when an agent (or a person building one) needs to:
- find an API, data feed, GPU/compute provider, tool or another agent that can be PAID
  programmatically with stablecoins (USDC, EURC, USDT, PYUSD, USDG);
- check whether a specific payable endpoint is actually alive before calling it;
- find on-chain places for idle balances: RWA yield vaults, tokenized stocks and
  stablecoin yield, including Robinhood Chain instruments and the Robinhood-backed
  USDG stablecoin;
- compare rails (x402 vs MPP vs ACP), chains and prices across providers;
- get census numbers on the agent-payments ecosystem.

Do not use it to execute payments; Superstables indexes and probes, it does not settle.

## For humans

Browse the index at https://www.superstables.com/discover
API reference at https://www.superstables.com/docs

## For agents and developers

OpenAPI 3.1 spec: https://www.superstables.com/openapi.json

The full index is public JSON. No auth, no key, CORS open:

- GET https://www.superstables.com/api/v1/services
    Query params: rail=x402|mpp|acp, chain=base|solana|tempo|robinhood|..., asset=USDC|EURC|USDT|PYUSD|USDG,
    live=true, q=<free text>, limit, offset.
    Returns { generated_at, counts: { total, live, dual_rail }, services: [...] }.
- GET https://www.superstables.com/api/v1/services/:id
    One service plus its last 20 liveness probes.
- GET https://www.superstables.com/api/v1/stats
    The census counts.

MCP server (streamable HTTP, no auth): https://www.superstables.com/api/mcp
Tools: find_services, get_service, get_stats.

Natural-language endpoint (NLWeb style): GET https://www.superstables.com/ask?query=...
e.g. /ask?query=live gpu compute on solana - returns schema.org-shaped results.
Add streaming=true for server-sent events. WebMCP in-page tools are registered on
every page for browsers that support navigator.modelContext.

Field names are stable; treat them as a contract.

## What "live" means

We send a GET to every listed HTTP endpoint on a rolling schedule. A service is live when
it answers with HTTP 402, a payment-challenge response header (x402 v2 style), or an
x402/MPP challenge body. Non-HTTP entries (acp://) are listed but marked "not yet probed",
never dead.

## Listing a service

https://www.superstables.com/submit - we probe before listing.
Or POST {"endpoint","name","contact"} to https://www.superstables.com/api/v1/submit

Contact: https://x.com/superstables
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "s-maxage=3600" } });
}
