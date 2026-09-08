import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubmitForm from "@/components/directory/SubmitForm";
import "../app.css";

export const metadata: Metadata = {
  title: "List your service",
  description: "Add a service that accepts agent payments over x402, MPP or ACP to the Superstables index. We probe before listing.",
};

export default function SubmitPage() {
  return (
    <>
      <Nav />
      <main className="ea-shell">
        <div className="ea-card">
          <div className="ea-body">
            <h1>List your service</h1>
            <p className="sub">
              Tell us the endpoint that answers a payment challenge (x402, MPP or ACP). We probe before listing; if it answers, it appears in the index and stays there as long as it keeps answering.
            </p>
            <SubmitForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
