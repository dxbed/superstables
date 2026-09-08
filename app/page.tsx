import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Rails from "@/components/Rails";
import Api from "@/components/Api";
import Roadmap from "@/components/Roadmap";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Superstables",
      url: "https://www.superstables.com",
      logo: "https://www.superstables.com/icon.svg",
      sameAs: ["https://x.com/superstables", "https://github.com/dxbed/superstables"],
      description: "The neutral, liveness-probed index of services AI agents can pay with stablecoins across x402, MPP and ACP.",
    },
    {
      "@type": "WebSite",
      name: "Superstables",
      url: "https://www.superstables.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.superstables.com/discover?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <Hero />
        <Rails />
        <Api />
        <Roadmap />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
