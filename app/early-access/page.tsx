import type { Metadata } from "next";
import Nav from "@/components/Nav";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import "../app.css";

export const metadata: Metadata = {
  title: "Get early access to Superstables",
  description: "Join the early access list for the payment router for AI agents. Five quick questions so we onboard the right builders first.",
};

export default function EarlyAccessPage() {
  return (
    <>
      <Nav />
      <main className="ea-shell">
        <EarlyAccessForm />
      </main>
    </>
  );
}
