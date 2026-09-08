/**
 * Review gate. A single shared password protects /app and /onboarding while the
 * product is under team review. Works in both the Node and Edge runtimes.
 */
export const GATE_COOKIE = "ss_gate";

export function reviewPassword(): string {
  // Empty when REVIEW_PASSWORD is unset; callers must treat that as "gate closed".
  return process.env.REVIEW_PASSWORD ?? "";
}

export async function gateToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`superstables-review:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
