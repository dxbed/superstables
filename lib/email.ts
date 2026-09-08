import { Resend } from "resend";
import { QUESTIONS, FREE_TEXT } from "@/content/earlyAccess";

/**
 * Transactional email via Resend. Silently does nothing when RESEND_API_KEY is unset,
 * so the form keeps working in environments without email configured.
 *
 * Env:
 *   RESEND_API_KEY          from the Resend integration
 *   EARLY_ACCESS_NOTIFY_TO  who gets the "new application" email (unset = no notifications)
 *   EMAIL_FROM              sender; must be on a verified domain in Resend
 */
const NOTIFY_TO = process.env.EARLY_ACCESS_NOTIFY_TO || "";
/** Sender: EMAIL_FROM if set, else hello@ on the domain the Resend integration provisioned, else Resend's shared test sender. */
const FROM =
  process.env.EMAIL_FROM ||
  (process.env.RESEND_EMAIL_DOMAIN ? `Superstables <hello@${process.env.RESEND_EMAIL_DOMAIN}>` : "Superstables <onboarding@resend.dev>");

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function notifyNewApplication(app: { id: string; email: string; answers: Record<string, string | string[]>; wish: string; isUpdate: boolean; referredBy?: string | null }) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !NOTIFY_TO) return { sent: false, reason: !key ? "no RESEND_API_KEY" : "no EARLY_ACCESS_NOTIFY_TO" };

  const rows = QUESTIONS.map((q) => {
    const v = app.answers[q.id];
    const text = Array.isArray(v) ? v.join(", ") : v || "";
    return `<tr><td style="padding:6px 12px 6px 0;color:#5E6862;vertical-align:top;white-space:nowrap">${esc(q.title)}</td><td style="padding:6px 0">${esc(text)}</td></tr>`;
  }).join("");
  const wish = app.wish ? `<tr><td style="padding:6px 12px 6px 0;color:#5E6862;vertical-align:top">${esc(FREE_TEXT.title)}</td><td style="padding:6px 0">${esc(app.wish)}</td></tr>` : "";

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#0A0C0E;max-width:640px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#5E6862">Superstables · early access</p>
    <h1 style="font-size:20px;margin:0 0 16px">${app.isUpdate ? "Updated application" : "New application"}: ${esc(app.email)}</h1>
    <table style="border-collapse:collapse;font-size:14.5px">${rows}${wish}${app.referredBy ? `<tr><td style="padding:6px 12px 6px 0;color:#5E6862">Referred by</td><td style="padding:6px 0">code ${esc(app.referredBy)}</td></tr>` : ""}</table>
    <p style="margin:20px 0 0;font-size:13px;color:#5E6862">
      <a href="https://www.superstables.com/app/applicants" style="color:#0A0C0E">Open the applicants list</a> · id ${app.id}
    </p>
  </div>`;

  const text = [
    `${app.isUpdate ? "Updated" : "New"} early-access application: ${app.email}`,
    "",
    ...QUESTIONS.map((q) => `${q.title}\n  ${Array.isArray(app.answers[q.id]) ? (app.answers[q.id] as string[]).join(", ") : app.answers[q.id] || ""}`),
    app.wish ? `${FREE_TEXT.title}\n  ${app.wish}` : "",
    app.referredBy ? `Referred by code ${app.referredBy}` : "",
    "",
    "https://www.superstables.com/app/applicants",
  ].join("\n");

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: app.email,
    subject: `${app.isUpdate ? "Updated" : "New"} early access: ${app.email}`,
    html,
    text,
  });
  if (error) {
    console.error("[email] send failed", error);
    return { sent: false, reason: error.message };
  }
  return { sent: true };
}

/** Alert email when a crawl run fails or every source comes back empty. */
export async function notifyCrawlFailure(detail: unknown) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !NOTIFY_TO) return { sent: false };
  const resend = new Resend(key);
  const body = JSON.stringify(detail, null, 2).slice(0, 5000);
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: "Superstables crawl failed - index may be stale",
    text: `A directory crawl run failed or returned no data.\n\n${body}\n\nCheck Vercel logs for /api/cron/crawl.`,
  });
  return { sent: true };
}

/** Notify on a vendor self-submission, with the immediate probe result. */
export async function notifySubmission(sub: { endpoint: string; name: string | null; contact: string | null; probe: { ok: boolean; statusCode: number | null; method: string } | null }) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !NOTIFY_TO) return { sent: false };
  const resend = new Resend(key);
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `Directory submission: ${sub.name ?? sub.endpoint}`,
    text: [
      `Endpoint: ${sub.endpoint}`,
      `Name: ${sub.name ?? ""}`,
      `Contact: ${sub.contact ?? ""}`,
      sub.probe ? `Immediate probe: ${sub.probe.ok ? "LIVE" : "no challenge"} (HTTP ${sub.probe.statusCode ?? "n/a"}, ${sub.probe.method})` : "Immediate probe failed to run",
      "",
      "Approve it by setting approved=true on the submissions row; it joins the next crawl.",
    ].join("\n"),
  });
  return { sent: true };
}
