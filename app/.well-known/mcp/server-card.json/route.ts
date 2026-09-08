import { NextResponse } from "next/server";

export const dynamic = "force-static";

/** MCP server card: lets agents preview the server before opening a transport connection. */
const CARD = {
  name: "superstables",
  description:
    "The neutral index of services an AI agent can pay with stablecoins (x402, MPP, ACP), deduplicated and independently probed for liveness. Read-only, no auth.",
  version: "1.0.0",
  serverUrl: "https://www.superstables.com/api/mcp",
  transport: "streamable-http",
  authentication: { type: "none" },
  tools: [
    { name: "find_services", description: "Find payable services by free text, rail, chain, asset and liveness." },
    { name: "get_service", description: "Full record for one service, including its last 20 liveness probes." },
    { name: "get_stats", description: "Census counts: total, live, probed, dual-rail, rails." },
  ],
  contact: "https://x.com/superstables",
  documentation: "https://www.superstables.com/docs",
};

export function GET() {
  return NextResponse.json(CARD, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "s-maxage=3600" } });
}
