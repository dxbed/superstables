import type { Metadata } from "next";
import { StoreProvider } from "@/lib/store";
import "../app.css";

export const metadata: Metadata = { title: "Get started with Superstables", robots: { index: false } };

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
