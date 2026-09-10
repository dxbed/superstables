import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { getService, listServices, stats } from "@/lib/directory/query";

export const maxDuration = 60;

/**
 * MCP server over streamable HTTP: the index as native agent tools.
 * Connect with: { "url": "https://www.superstables.com/api/mcp" } - no auth.
 */
const handler = createMcpHandler((server) => {
  server.registerTool(
    "find_services",
    {
      title: "Find payable services",
      description:
        "Find services an AI agent can pay with stablecoins (x402, MPP or ACP). Every HTTP endpoint is independently probed; live=true means it answered a valid payment challenge on the last probe.",
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      inputSchema: z.object({
        q: z.string().optional().describe("Free-text search over name, category and endpoint"),
        rail: z.enum(["x402", "mpp", "acp"]).optional(),
        chain: z.string().optional().describe("base, solana, tempo, ethereum, polygon, ..."),
        asset: z.string().optional().describe("USDC, EURC, USDT, PYUSD"),
        live_only: z.boolean().optional().describe("Only services that answered our last probe"),
        limit: z.number().int().min(1).max(100).optional(),
      }),
    },
    async ({ q, rail, chain, asset, live_only, limit }) => {
      const services = await listServices({ q, rail, chain, asset, live: live_only ? true : undefined, limit: limit ?? 25 });
      return { content: [{ type: "text", text: JSON.stringify({ count: services.length, services }, null, 2) }] };
    }
  );

  server.registerTool(
    "get_service",
    {
      title: "Get one service",
      description: "Full record for one service by id (the slug shown by find_services), including its last 20 liveness probes.",
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      inputSchema: z.object({ id: z.string().describe("Service id, e.g. 10x402.com") }),
    },
    async ({ id }) => {
      const s = await getService(id.toLowerCase());
      if (!s) return { content: [{ type: "text", text: `No service with id "${id}".` }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(s, null, 2) }] };
    }
  );

  server.registerTool(
    "get_stats",
    {
      title: "Index census",
      description: "Census counts for the whole index: total services, how many are verified live, dual-rail count, rails covered.",
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      inputSchema: z.object({}),
    },
    async () => ({ content: [{ type: "text", text: JSON.stringify(await stats(), null, 2) }] })
  );
}, { serverInfo: { name: "superstables", version: "1.0.0" } });

export { handler as GET, handler as POST, handler as DELETE };
