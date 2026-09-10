import { NextResponse } from "next/server";

export const dynamic = "force-static";

/** OpenAPI 3.1 description of the public index API. Field names are a stable contract. */
const SERVICE = {
  type: "object",
  properties: {
    id: { type: "string", description: "Stable slug of the endpoint host" },
    name: { type: "string" },
    category: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    rails: { type: "array", items: { type: "string", enum: ["x402", "mpp", "acp"] } },
    chains: { type: "array", items: { type: "string" }, description: "base, solana, tempo, ... (unknown chains keep their CAIP-2 id)" },
    assets: { type: "array", items: { type: "string" }, description: "USDC, EURC, USDT, PYUSD, USDG, ..." },
    price: { type: "object", properties: { display: { type: ["string", "null"] }, usd: { type: ["number", "null"] } } },
    endpoint: { type: "string", description: "The URL that answers the payment challenge" },
    facilitator: { type: ["string", "null"] },
    live: { type: ["boolean", "null"], description: "true = answered a payment challenge on the last probe; null = not yet probed (e.g. acp://)" },
    last_seen_live: { type: ["string", "null"], format: "date-time" },
    first_indexed: { type: "string", format: "date-time" },
    sources: { type: "array", items: { type: "string" }, description: "Directories this service was found in" },
  },
} as const;

const ERROR = {
  type: "object",
  properties: {
    error: {
      type: "object",
      required: ["code", "message"],
      properties: {
        code: { type: "string", description: "Stable machine-readable code, e.g. not_found, invalid_endpoint, invalid_json" },
        message: { type: "string", description: "Human-readable explanation with a pointer to recovery" },
      },
    },
  },
} as const;

const SPEC = {
  openapi: "3.1.0",
  info: {
    title: "Superstables Index API",
    version: "1.0.0",
    description:
      "The neutral index of services an AI agent can pay with stablecoins, across x402, MPP and ACP, deduplicated and independently probed for liveness. Free, no key, CORS open. Use it to find payable data, compute, tools and agent services.",
    contact: { name: "Superstables on X", url: "https://x.com/superstables" },
  },
  servers: [{ url: "https://www.superstables.com" }],
  paths: {
    "/api/v1/services": {
      get: {
        operationId: "listServices",
        summary: "List payable services",
        description: "Filterable list of every indexed service. A service is 'live' when it answered a valid payment challenge (HTTP 402, payment-challenge header, or challenge body) on our last probe.",
        parameters: [
          { name: "rail", in: "query", schema: { type: "string", enum: ["x402", "mpp", "acp"] } },
          { name: "chain", in: "query", schema: { type: "string" }, example: "base" },
          { name: "asset", in: "query", schema: { type: "string" }, example: "USDC" },
          { name: "live", in: "query", schema: { type: "boolean" }, description: "true returns only services that answered our last probe" },
          { name: "q", in: "query", schema: { type: "string" }, description: "Free-text search over name, category and endpoint" },
          { name: "limit", in: "query", schema: { type: "integer", maximum: 500, default: 100 } },
          { name: "offset", in: "query", schema: { type: "integer", default: 0 } },
        ],
        responses: {
          "200": {
            description: "Matching services with census counts",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    generated_at: { type: "string", format: "date-time" },
                    counts: { type: "object", properties: { total: { type: "integer" }, live: { type: "integer" }, dual_rail: { type: "integer" } } },
                    services: { type: "array", items: SERVICE },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/services/{id}": {
      get: {
        operationId: "getService",
        summary: "One service with probe history",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, example: "10x402.com" }],
        responses: {
          "200": { description: "The service plus its last 20 liveness probes", content: { "application/json": { schema: SERVICE } } },
          "404": { description: "Unknown service id", content: { "application/json": { schema: ERROR } } },
        },
      },
    },
    "/api/v1/stats": {
      get: {
        operationId: "getStats",
        summary: "Census counts",
        responses: {
          "200": {
            description: "Totals for the whole index",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { generated_at: { type: "string" }, total: { type: "integer" }, live: { type: "integer" }, probed: { type: "integer" }, dual_rail: { type: "integer" }, rails: { type: "integer" }, last_probe_at: { type: ["string", "null"] } },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/submit": {
      post: {
        operationId: "submitService",
        summary: "Submit a service for listing",
        description: "We probe before listing. If the endpoint answers a valid payment challenge it joins the index on the next crawl.",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["endpoint"], properties: { endpoint: { type: "string", format: "uri" }, name: { type: "string" }, contact: { type: "string" } } } } },
        },
        parameters: [{ name: "Idempotency-Key", in: "header", required: false, schema: { type: "string" }, description: "Optional client key; repeated submissions of the same endpoint within 24h are deduplicated and echoed back." }],
        responses: {
          "200": { description: "Accepted into the moderation queue (deduplicated: true when a recent identical submission exists)" },
          "400": { description: "Invalid request", content: { "application/json": { schema: ERROR } } },
        },
      },
    },
  },
} as const;

export function GET() {
  return NextResponse.json(SPEC, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "s-maxage=3600" } });
}
