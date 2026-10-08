import type { Metadata } from "next";
import Link from "next/link";
import { loadNotes } from "@/lib/corpus.mjs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes",
  description: `Short, exploratory notes by ${site.name}: ideas in progress on technology, philosophy and beyond.`,
  alternates: { canonical: "/notes", types: { "application/rss+xml": "/notes/feed.xml" } },
};

export default function NotesPage() {
  const notes = loadNotes();
  return (
    <>
      <h1>Notes</h1>
      <p className="lede prose">
        Shorter and rougher than the essays: ideas in progress, written straight to this site.
      </p>
      <p className="meta">
        <a href="/notes/feed.xml">Subscribe to notes via RSS</a> · <a href="/feed.xml">Everything (essays and notes)</a>
      </p>
      <ul className="essay-list">
        {notes.map((n) => (
          <li key={n.slug}>
            <p className="meta" style={{ margin: 0 }}>
              <time dateTime={n.date}>{n.date}</time>
              {n.draft && <> · <strong>draft</strong></>}
            </p>
            <Link className="title" href={`/notes/${n.slug}`}>{n.title}</Link>
            {n.summary && <p>{n.summary}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
