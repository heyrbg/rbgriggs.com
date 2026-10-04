import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Explicitly welcome every major AI crawler: training, search and user-initiated fetch agents.
const AI_AGENTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "Google-Extended", "Googlebot", "Bingbot",
  "PerplexityBot", "Perplexity-User",
  "CCBot", "Applebot", "Applebot-Extended",
  "Meta-ExternalAgent", "Meta-ExternalFetcher", "FacebookBot",
  "Amazonbot", "DuckAssistBot", "MistralAI-User", "cohere-ai", "YouBot", "Bytespider", "AI2Bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
