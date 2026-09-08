import { NextResponse } from "next/server";
import { stats } from "@/lib/directory/query";

export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "s-maxage=300, stale-while-revalidate=3600",
  "RateLimit-Policy": "300;w=60",
  "RateLimit-Limit": "300",
};

export async function GET() {
  return NextResponse.json({ generated_at: new Date().toISOString(), ...(await stats()) }, { headers: CORS });
}

export function OPTIONS() {
  return new Response(null, { headers: CORS });
}
