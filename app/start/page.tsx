import type { Metadata } from "next";
import GateForm from "@/components/GateForm";
import { LogoMark } from "@/components/Logo";
import "../app.css";

export const metadata: Metadata = { title: "Superstables review access", robots: { index: false } };

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-head">
          <span className="auth-logo">
            <LogoMark variant="auto" size={28} />
          </span>
          <h1>Team review</h1>
          <p>The product is in private review. Enter the password you were sent to continue.</p>
        </div>
        <GateForm next={next && next.startsWith("/") ? next : "/onboarding"} />
      </div>
    </main>
  );
}
