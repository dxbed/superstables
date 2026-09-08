import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/start", "/onboarding", "/app", "/api/cron", "/api/gate", "/api/early-access", "/brand"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "OAI-SearchBot", "Google-Extended"], allow: ["/", "/api/v1/", "/llms.txt"], disallow: ["/start", "/onboarding", "/app"] },
      { userAgent: ["CCBot", "Bytespider"], disallow: "/" },
    ],
    sitemap: "https://www.superstables.com/sitemap.xml",
  };
}
