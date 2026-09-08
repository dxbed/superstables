"use client";

import { useEffect } from "react";

/**
 * WebMCP: expose the index as in-page tools for browser agents.
 * Uses the experimental navigator.modelContext API when the browser provides it;
 * silently does nothing otherwise. Read-only.
 */
type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<{ content: { type: "text"; text: string }[] }>;
};
type ModelContext = { registerTool?: (t: Tool) => void; provideContext?: (ctx: { tools: Tool[] }) => void };

const text = (s: string) => ({ content: [{ type: "text" as const, text: s }] });

const TOOLS: Tool[] = [
  {
    name: "find_services",
    description: "Find services an AI agent can pay with stablecoins (x402, MPP or ACP) in the Superstables index. live=true means the endpoint answered a payment challenge on our last probe.",
    inputSchema: {
      type: "object",
      properties: {
        q: { type: "string", description: "Free-text search" },
        rail: { type: "string", enum: ["x402", "mpp", "acp"] },
        chain: { type: "string", description: "base, solana, tempo, ..." },
        asset: { type: "string", description: "USDC, EURC, USDT, PYUSD" },
        live_only: { type: "boolean" },
        limit: { type: "number", maximum: 50 },
      },
    },
    execute: async (args) => {
      const p = new URLSearchParams();
      if (typeof args.q === "string") p.set("q", args.q);
      if (typeof args.rail === "string") p.set("rail", args.rail);
      if (typeof args.chain === "string") p.set("chain", args.chain);
      if (typeof args.asset === "string") p.set("asset", String(args.asset));
      if (args.live_only === true) p.set("live", "true");
      p.set("limit", String(typeof args.limit === "number" ? Math.min(args.limit, 50) : 20));
      const res = await fetch(`/api/v1/services?${p}`);
      return text(JSON.stringify(await res.json()));
    },
  },
  {
    name: "get_stats",
    description: "Census counts for the Superstables index: total services, verified live, dual-rail, rails covered.",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const res = await fetch("/api/v1/stats");
      return text(JSON.stringify(await res.json()));
    },
  },
];

export default function WebMcp() {
  useEffect(() => {
    try {
      const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
      if (!mc) return;
      if (typeof mc.registerTool === "function") {
        for (const t of TOOLS) mc.registerTool(t);
      } else if (typeof mc.provideContext === "function") {
        mc.provideContext({ tools: TOOLS });
      }
    } catch {
      /* experimental API; never break the page */
    }
  }, []);
  return null;
}
