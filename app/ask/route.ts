import { NextResponse } from "next/server";
import { listServices, stats } from "@/lib/directory/query";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

const RAILS = ["x402", "mpp", "acp"];
const CHAINS = ["base", "solana", "tempo", "ethereum", "polygon", "arbitrum", "optimism", "avalanche", "robinhood"];
const ASSETS = ["usdc", "eurc", "usdt", "pyusd", "usdg"];
const LIVE_WORDS = ["live", "alive", "working", "online", "available", "up", "responding", "verified"];
const STOP = new Set(["a", "an", "the", "is", "are", "which", "what", "who", "that", "can", "i", "pay", "for", "with", "on", "in", "to", "of", "and", "or", "service", "services", "endpoint", "endpoints", "list", "find", "show", "me", "agent", "agents", "stablecoin", "stablecoins", "payable", ...LIVE_WORDS, ...RAILS, ...ASSETS, ...CHAINS]);

/**
 * NLWeb-style natural-language endpoint. Ask in plain words which payable
 * services exist; get schema.org-shaped results. ?streaming=true (or an SSE
 * Accept header) streams results as server-sent events.
 */
async function answer(query: string) {
  const lower = query.toLowerCase();
  const words = lower.split(/[^a-z0-9.$-]+/).filter(Boolean);
  const rail = RAILS.find((r) => words.includes(r));
  const chain = CHAINS.find((c) => words.includes(c));
  const asset = ASSETS.find((a) => words.includes(a));
  const live = LIVE_WORDS.some((w) => words.includes(w)) ? true : undefined;
  const q = words.filter((w) => !STOP.has(w)).join(" ").trim() || undefined;

  const [services, counts] = await Promise.all([
    listServices({ q, rail, chain, asset: asset?.toUpperCase(), live, limit: 10 }),
    stats(),
  ]);

  return {
    query,
    interpreted: { q: q ?? null, rail: rail ?? null, chain: chain ?? null, asset: asset?.toUpperCase() ?? null, live_only: live ?? false },
    summary: `${counts.live} of ${counts.total} indexed services currently answer a valid payment challenge. ${services.length} match this query.`,
    results: services.map((s, i) => ({
      url: `https://www.superstables.com/s/${s.id}`,
      name: s.name,
      site: "superstables.com",
      score: Math.max(0, 1 - i * 0.05),
      description: [s.description ?? s.category, `rails: ${s.rails.join(", ")}`, s.live === true ? "verified live" : s.live === false ? "not responding to probes" : "not yet probed"].filter(Boolean).join(" · "),
      schema_object: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.name,
        url: `https://www.superstables.com/s/${s.id}`,
        description: s.description ?? undefined,
        offers: s.price.usd != null ? { "@type": "Offer", price: s.price.usd, priceCurrency: "USD" } : undefined,
      },
    })),
  };
}

async function handle(query: string | null, wantsStream: boolean) {
  if (!query?.trim()) {
    return NextResponse.json({ error: { code: "missing_query", message: "Pass ?query=<natural language question> (e.g. /ask?query=live gpu compute on solana)." } }, { status: 400, headers: CORS });
  }
  const data = await answer(query.trim().slice(0, 500));

  if (wantsStream) {
    const enc = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const send = (obj: unknown) => controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));
        send({ message_type: "summary", query_id: crypto.randomUUID(), summary: data.summary, interpreted: data.interpreted });
        for (const r of data.results) send({ message_type: "result", results: [r] });
        send({ message_type: "complete" });
        controller.close();
      },
    });
    return new Response(stream, { headers: { ...CORS, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
  }
  return NextResponse.json(data, { headers: { ...CORS, "Cache-Control": "s-maxage=300" } });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") ?? url.searchParams.get("q");
  const wantsStream = url.searchParams.get("streaming") === "true" || (req.headers.get("accept")?.includes("text/event-stream") ?? false);
  return handle(query, wantsStream);
}

export async function POST(req: Request) {
  let body: { query?: unknown; streaming?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    /* fall through to missing_query */
  }
  return handle(typeof body.query === "string" ? body.query : null, body.streaming === true);
}

export function OPTIONS() {
  return new Response(null, { headers: CORS });
}
