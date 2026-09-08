export const dynamic = "force-static";

/** auth.md (workos/auth.md convention): how agents authenticate. Here: they don't have to. */
const BODY = `# Authentication

## Overview

The Superstables Index API and MCP server are public and read-only. No authentication,
no API key, no OAuth. CORS is open.

## Endpoints

- REST: https://www.superstables.com/api/v1/services (spec: https://www.superstables.com/openapi.json)
- MCP (streamable HTTP): https://www.superstables.com/api/mcp

## Rate limits

Soft advisory limit of 300 requests per minute per client (RateLimit headers on responses).
Responses are CDN-cached for 300 seconds; there is no benefit to polling faster.

## Write operations

The only write is POST /api/v1/submit (suggest a service for listing). It is unauthenticated
and goes to a moderation queue; nothing is published without an independent liveness probe.

## Contact

https://x.com/superstables
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "s-maxage=3600" } });
}
