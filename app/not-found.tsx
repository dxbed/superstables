import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./app.css";

/** Real 404 with recovery pointers, for people and for agents. */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="wrap" style={{ padding: "80px 0 120px", maxWidth: 640 }}>
        <span className="eyebrow plain">404</span>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", marginTop: 10 }}>That page does not exist.</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          Places that do: the <Link className="link" href="/discover">service index</Link>, the{" "}
          <Link className="link" href="/docs">API reference</Link>, the{" "}
          <a className="link" href="https://www.superstables.com/llms.txt">llms.txt</a> overview, or the{" "}
          <a className="link" href="https://www.superstables.com/sitemap.xml">sitemap</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
