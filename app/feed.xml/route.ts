import { essayUrl, loadEssays, loadNotes, noteUrl } from "@/lib/corpus.mjs";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const entries = [
    ...loadEssays().map((e) => ({ title: e.title, url: essayUrl(e.slug), date: e.date, summary: e.summary })),
    ...loadNotes().map((n) => ({ title: n.title, url: noteUrl(n.slug), date: n.date, summary: n.summary })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const items = entries
    .map(
      (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${e.url}</link>
      <guid>${e.url}</guid>
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
