import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateToken, reviewPassword } from "@/lib/gate";

const NOINDEX = "noindex, nofollow, noarchive";

/** /start is public (it is the door) but must never be indexed; everything behind it needs the review cookie. */
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/start" || path.startsWith("/start/")) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", NOINDEX);
    return res;
  }
  const cookie = request.cookies.get(GATE_COOKIE)?.value;
  if (reviewPassword() && cookie && cookie === (await gateToken(reviewPassword()))) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", NOINDEX);
    return res;
  }
  const url = new URL("/start", request.url);
  url.searchParams.set("next", path);
  const res = NextResponse.redirect(url);
  res.headers.set("X-Robots-Tag", NOINDEX);
  return res;
}

export const config = {
  matcher: ["/start/:path*", "/app/:path*", "/onboarding/:path*"],
};
