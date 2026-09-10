import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/components/ThemeToggle";
import Analytics from "@/components/Analytics";
import WebMcp from "@/components/WebMcp";
import Script from "next/script";

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

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
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
  title: "Superstables, the payment router for AI agents",
  description: "Superstables is the OpenRouter for agentic payments: one call lets an AI agent pay on any rail, chain or stablecoin. Non-custodial and open source.",
  openGraph: {
    title: "Superstables, the payment router for AI agents",
    description: "Superstables is the OpenRouter for agentic payments.",
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${archivo.variable}`} suppressHydrationWarning>
      <body>
        {/* Applies a saved theme before first paint so there is no flash. */}
        <Script id="theme-init" strategy="beforeInteractive">{themeInitScript}</Script>
        {children}
        <Analytics />
        <WebMcp />
      </body>
    </html>
  );
}
