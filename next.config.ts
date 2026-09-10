import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const help = [
      '<https://www.superstables.com/llms.txt>; rel="help"; type="text/plain"',
      '<https://www.superstables.com/openapi.json>; rel="describedby"; type="application/openapi+json"',
    ];
    return [
      { source: "/", headers: [{ key: "Link", value: help.join(", ") }] },
      { source: "/discover", headers: [{ key: "Link", value: help.join(", ") }] },
      { source: "/docs", headers: [{ key: "Link", value: [...help, '<https://www.superstables.com/docs.md>; rel="alternate"; type="text/markdown"'].join(", ") }] },
    ];
  },
};

export default nextConfig;
