import { essayUrl, loadEssays, loadNotes, noteUrl } from "./corpus.mjs";
import { renderMarkdown } from "./markdown";
import type { FeedItem } from "./rss";
import { site } from "./site";

export const essayItems = (): FeedItem[] =>
  loadEssays().map((e) => ({ title: e.title, url: essayUrl(e.slug), date: e.date, summary: e.summary }));

// Notes are short, so the feed carries their full text.
export const noteItems = (): FeedItem[] =>
  loadNotes().map((n) => ({
    title: n.title,
    url: noteUrl(n.slug),
    date: n.date,
    summary: n.summary,
    html: renderMarkdown(n.body).replace(/(href|src)="\//g, `$1="${site.url}/`),
  }));
