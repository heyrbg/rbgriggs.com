import { essayUrl, loadEssays } from "@/lib/corpus.mjs";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = loadEssays()
    .map(
      (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${essayUrl(e.slug)}</link>
      <guid>${essayUrl(e.slug)}</guid>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <dc:creator>${site.name}</dc:creator>
      <description>${esc(e.summary)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
