import { NextResponse } from "next/server";

export const dynamic = "force-static";

/** RFC 9727 api-catalog: linkset pointing at the machine-readable API description. */
const LINKSET = {
  linkset: [
    {
      anchor: "https://www.superstables.com/api/v1/services",
      "service-desc": [{ href: "https://www.superstables.com/openapi.json", type: "application/openapi+json" }],
      "service-doc": [{ href: "https://www.superstables.com/docs", type: "text/html" }],
      "service-meta": [{ href: "https://www.superstables.com/llms.txt", type: "text/plain" }],
    },
  ],
};

export function GET() {
  return new NextResponse(JSON.stringify(LINKSET), {
    headers: { "Content-Type": "application/linkset+json", "Access-Control-Allow-Origin": "*", "Cache-Control": "s-maxage=3600" },
  });
}
