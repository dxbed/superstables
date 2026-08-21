import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Rails from "@/components/Rails";
import Why from "@/components/Why";
import Api from "@/components/Api";
import Control from "@/components/Control";
import Neutral from "@/components/Neutral";
import Roadmap from "@/components/Roadmap";
import WhyNow from "@/components/WhyNow";
import Lisbon from "@/components/Lisbon";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Rails />
        <Why />
        <Api />
        <Control />
        <Neutral />
        <Roadmap />
        <WhyNow />
        <Lisbon />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
