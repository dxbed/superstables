import { NextResponse } from "next/server";

export const dynamic = "force-static";

/** Agentic Resource Discovery catalog (agenticresourcediscovery.org shape). */
const ARD = {
  specVersion: "1.0",
  name: "Superstables",
  description: "The neutral, liveness-probed index of services AI agents can pay with stablecoins across x402, MPP and ACP.",
  url: "https://www.superstables.com",
  publisher: { name: "Superstables", url: "https://www.superstables.com", contact: "https://x.com/superstables" },
  entries: [
    {
      identifier: "urn:air:superstables.com:mcp:superstables",
      displayName: "superstables",
      type: "mcp-server",
      description: "Query the index as native tools: find_services, get_service, get_stats. Read-only, no auth. Streamable HTTP.",
      mediaType: "application/json",
      url: "https://www.superstables.com/api/mcp",
    },
    {
      identifier: "urn:air:superstables.com:api:index",
      displayName: "Superstables Index API",
      type: "api",
      description: "Public JSON API for the index. No key, CORS open. OpenAPI 3.1 at /openapi.json.",
      mediaType: "application/openapi+json",
      url: "https://www.superstables.com/openapi.json",
    },
    {
      identifier: "urn:air:superstables.com:nlweb:ask",
      displayName: "Ask the index",
      type: "nlweb",
      description: "Natural-language queries over the index. GET /ask?query=... ; streaming=true for SSE.",
      mediaType: "application/json",
      url: "https://www.superstables.com/ask",
    },
    {
      identifier: "urn:air:superstables.com:document:llms-txt",
      displayName: "llms.txt",
      type: "document",
      description: "Plain-text overview with when-to-use guidance for agents.",
      mediaType: "text/plain",
      url: "https://www.superstables.com/llms.txt",
    },
  ],
};

export function GET() {
  return NextResponse.json(ARD, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "s-maxage=3600" } });
}
