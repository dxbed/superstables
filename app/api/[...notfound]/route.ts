import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Unknown API paths answer JSON, not an HTML shell, so agents can recover. */
const body = {
  error: {
    code: "not_found",
    message: "Unknown API path. See https://www.superstables.com/openapi.json for the available endpoints.",
    endpoints: ["/api/v1/services", "/api/v1/services/{id}", "/api/v1/stats", "/api/v1/submit", "/api/mcp"],
  },
};
const headers = { "Access-Control-Allow-Origin": "*" };

export function GET() {
  return NextResponse.json(body, { status: 404, headers });
}
export function POST() {
  return NextResponse.json(body, { status: 404, headers });
}
