import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/components/ThemeToggle";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.superstables.com"),
  title: "Superstables — The payment router for AI agents",
  description:
    "One CLI, one SDK, one MCP server — pay and get paid across every rail, chain and stablecoin. Non-custodial, open source, built in Lisbon.",
  openGraph: {
    title: "Superstables — The payment router for AI agents",
    description:
      "Your agent calls pay(url, max). Superstables detects the protocol, quotes every live rail, and settles the cheapest path under a cap you control.",
    url: "https://www.superstables.com",
    siteName: "Superstables",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies a saved theme before first paint so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
