export const dynamic = "force-static";

/** Markdown mirror of /docs for agents that prefer text over HTML. */
const BODY = `# Superstables Index API

Everything on https://www.superstables.com/discover is served by a public JSON API.
No key, no account, CORS open, cached five minutes. Field names are a stable contract.
Machine-readable spec: https://www.superstables.com/openapi.json

## Endpoints

- \`GET /api/v1/services\` - list services. Filters: rail (x402|mpp|acp), chain, asset, live=true, q (free text), limit (max 500), offset.
- \`GET /api/v1/services/:id\` - one service plus its last 20 liveness probes.
- \`GET /api/v1/stats\` - census counts: total, live, probed, dual-rail, rails.
- \`POST /api/v1/submit\` - submit a service: {"endpoint","name","contact"}. We probe before listing.

## Example

    curl "https://www.superstables.com/api/v1/services?rail=x402&live=true&q=compute&limit=20"

Returns { generated_at, counts: { total, live, dual_rail }, services: [...] } where each
service has id, name, description, rails, chains, assets, price {display, usd}, endpoint,
facilitator, live, last_seen_live, sources.

## Ask in natural language

    curl "https://www.superstables.com/ask?query=live%20gpu%20compute%20on%20solana"

NLWeb-style: returns { query, interpreted, summary, results[] } with schema.org
objects. Add streaming=true for server-sent events.

## MCP server

Streamable HTTP, no auth: https://www.superstables.com/api/mcp
Tools: find_services, get_service, get_stats.
Server card: https://www.superstables.com/.well-known/mcp/server-card.json

## What "live" means

We GET every listed HTTP endpoint on a rolling schedule. A service is live when it answers
with HTTP 402, a payment-challenge response header (x402 v2 style), or a challenge body.
Non-HTTP entries (acp://) are listed but never marked dead. Probe history is kept forever.

## Authentication

None required. See https://www.superstables.com/auth.md

Contact: https://x.com/superstables
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "s-maxage=3600" } });
}
