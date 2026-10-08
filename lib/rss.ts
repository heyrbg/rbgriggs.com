import { site } from "./site";

export type FeedItem = { title: string; url: string; date: string; summary: string; html?: string };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// CDATA can't contain its own terminator, so split any that appear in the HTML.
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

/** RSS 2.0 with full content (content:encoded) when an item supplies html. */
export function rss({ title, path, description, items }: { title: string; path: string; description: string; items: FeedItem[] }) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const body = sorted
    .map(
      (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.url}</link>
      <guid isPermaLink="true">${i.url}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <dc:creator>${esc(site.name)}</dc:creator>
      <description>${esc(i.summary)}</description>${i.html ? `\n      <content:encoded>${cdata(i.html)}</content:encoded>` : ""}
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${site.url}</link>
    <atom:link href="${site.url}${path}" rel="self" type="application/rss+xml" />
    <description>${esc(description)}</description>
    <language>en</language>
    <copyright>${esc(`${site.name}, ${site.license.name} (${site.license.url})`)}</copyright>${sorted[0] ? `\n    <lastBuildDate>${new Date(sorted[0].date).toUTCString()}</lastBuildDate>` : ""}
${body}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
