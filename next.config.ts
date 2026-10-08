import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `npm run dev` builds into .next-dev so a production build (.next) never clobbers a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Serve markdown with a proper content type so agents and crawlers read it as text.
  async headers() {
    const md = [
      { key: "Content-Type", value: "text/markdown; charset=utf-8" },
      { key: "X-Robots-Tag", value: "all" },
    ];
    return [
      { source: "/:path*.md", headers: md },
      { source: "/llms.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] },
      { source: "/llms-full.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] },
    ];
  },
};

export default nextConfig;
