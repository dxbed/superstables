import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Census from "@/components/directory/Census";
import DirectoryTable, { type ServiceRow } from "@/components/directory/Table";
import { listServices, stats } from "@/lib/directory/query";
import "../app.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Discover payable services",
  description: "The neutral, liveness-probed index of every service an AI agent can pay with stablecoins, across x402, MPP and ACP. Public JSON API, no key needed.",
};

export default async function DiscoverPage() {
  const [counts, services] = await Promise.all([stats(), listServices({ limit: 200 })]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Superstables index of payable services for AI agents",
    description: `Liveness-probed index of ${counts.total} services payable with stablecoins over x402, MPP and ACP. ${counts.live} answered a valid payment challenge on the last probe.`,
    url: "https://www.superstables.com/discover",
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", name: "Superstables", url: "https://www.superstables.com" },
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: "https://www.superstables.com/api/v1/services" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="wrap dir-wrap">
        <Census stats={counts} />
        <DirectoryTable initial={services as ServiceRow[]} total={counts.total} />
      </main>
      <Footer />
    </>
  );
}
