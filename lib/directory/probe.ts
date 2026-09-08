import "server-only";

/**
 * Liveness probe (briefing §5). GET the listed URL; a service is live when it
 * answers with a payment challenge:
 *   - HTTP status 402, or
 *   - a PAYMENT-REQUIRED / X-PAYMENT-REQUIRED / X-PAYMENT response header
 *     (x402 v2 moved the challenge to a header — header check is mandatory), or
 *   - an x402/MPP challenge shape in the body.
 * acp:// and other non-http schemes are never probed and never marked dead.
 */

const UA = "SuperstablesCrawler/0.1 (+https://www.superstables.com)";
const TIMEOUT_MS = 8000;

export type ProbeResult = {
  ok: boolean;
  statusCode: number | null;
  method: "http-402" | "payment-header" | "body-match" | "none" | "error";
  latencyMs: number;
  note: string | null;
};

const CHALLENGE_HEADERS = ["payment-required", "x-payment-required", "x-payment", "www-authenticate-payment", "x-402"];

function bodyLooksLikeChallenge(text: string): boolean {
  if (!text) return false;
  const t = text.slice(0, 4000);
  if (/"x402Version"|"accepts"\s*:\s*\[|"maxAmountRequired"|"payTo"|"paymentRequirements"/.test(t)) return true;
  if (/"mpp_session"|"session_challenge"|machine-payments/i.test(t)) return true;
  return false;
}

export function isProbeable(endpoint: string): boolean {
  return /^https?:\/\//i.test(endpoint);
}

export async function probeOne(endpoint: string): Promise<ProbeResult> {
  const started = Date.now();
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: { "User-Agent": UA, Accept: "*/*" },
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const latencyMs = Date.now() - started;
    if (res.status === 402) return { ok: true, statusCode: 402, method: "http-402", latencyMs, note: null };

    const header = CHALLENGE_HEADERS.find((h) => res.headers.get(h) != null);
    if (header) return { ok: true, statusCode: res.status, method: "payment-header", latencyMs, note: header };

    let body = "";
    try {
      body = await res.text();
    } catch {
      /* body unreadable; header checks already done */
    }
    if (bodyLooksLikeChallenge(body)) return { ok: true, statusCode: res.status, method: "body-match", latencyMs, note: null };

    return { ok: false, statusCode: res.status, method: "none", latencyMs, note: null };
  } catch (e) {
    return { ok: false, statusCode: null, method: "error", latencyMs: Date.now() - started, note: e instanceof Error ? e.name : "error" };
  }
}

/** Probe many endpoints with bounded concurrency. */
export async function probeMany(endpoints: { id: string; endpoint: string }[], concurrency = 12): Promise<Map<string, ProbeResult>> {
  const results = new Map<string, ProbeResult>();
  let i = 0;
  async function worker() {
    while (i < endpoints.length) {
      const item = endpoints[i++];
      results.set(item.id, await probeOne(item.endpoint));
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, endpoints.length) }, worker));
  return results;
}
