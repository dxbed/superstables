"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
/** Public pages only. Nothing behind the review gate is measured. */
const PRIVATE = ["/app", "/onboarding", "/start"];

export default function Analytics() {
  const path = usePathname();
  if (!GA_ID || PRIVATE.some((p) => path === p || path.startsWith(p + "/"))) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}

/** Fire a GA4 event. Safe to call when GA is not configured. */
export function track(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!GA_ID) return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    /* ignore */
  }
}
