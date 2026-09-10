export const dynamic = "force-static";

/** Machine-readable pricing. Honest version: the index is free. */
const BODY = `# Pricing

## Free (everything)

The Superstables index is free to use, for humans and for agents.

- Web directory: https://www.superstables.com/discover - free, no account
- JSON API: https://www.superstables.com/api/v1/services - free, no key, CORS open
- MCP server: https://www.superstables.com/api/mcp - free, no auth
- Natural-language endpoint: https://www.superstables.com/ask - free
- Listing a service: https://www.superstables.com/submit - free; we probe before listing

## Limits

Soft advisory limit of 300 requests per minute per client. Responses are CDN-cached
for 300 seconds. No paid tiers exist today; if that changes, this file changes first.

Contact: https://x.com/superstables
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "s-maxage=3600" } });
}
