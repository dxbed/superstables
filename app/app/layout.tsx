import type { Metadata } from "next";
import { StoreProvider } from "@/lib/store";
import Shell from "@/components/app/Shell";
import "../app.css";

export const metadata: Metadata = { title: "Superstables dashboard", robots: { index: false } };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Shell>{children}</Shell>
    </StoreProvider>
  );
}
