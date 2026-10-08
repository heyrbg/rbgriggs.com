import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote, loadEssays, loadNotes, noteUrl } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { personId } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { EssayList } from "@/components/EssayList";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return loadNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const n = getNote((await params).slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.summary || undefined,
    keywords: n.tags,
    robots: n.draft ? { index: false } : undefined,
    alternates: {
      canonical: `/notes/${n.slug}`,
      types: { "text/markdown": `/notes/${n.slug}.md`, "application/rss+xml": "/notes/feed.xml" },
    },
    openGraph: { type: "article", title: n.title, description: n.summary, publishedTime: n.date, authors: [site.name] },
  };
}

export default async function NotePage({ params }: Params) {
  const n = getNote((await params).slug);
  if (!n) notFound();
  const essays = loadEssays();
  const related = n.related.map((s) => essays.find((e) => e.slug === s)).filter((e) => e !== undefined);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: n.title,
          description: n.summary,
          keywords: n.tags.join(", "),
          datePublished: n.date,
          url: noteUrl(n.slug),
          author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
          license: site.license.url,
          isAccessibleForFree: true,
          encoding: { "@type": "MediaObject", encodingFormat: "text/markdown", contentUrl: `${noteUrl(n.slug)}.md` },
        }}
      />
      <p className="kicker">
        <span className="label">Note</span> · <time dateTime={n.date}>{n.date}</time> · by{" "}
        <Link href="/about" rel="author">{site.name}</Link>
        {n.draft && <> · <strong>DRAFT (not published)</strong></>}
      </p>
      <h1>{n.title}</h1>
      <section className="prose">
        {n.summary && <p className="lede">{n.summary}</p>}
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(n.body) }} />
        <p className="meta">
          <a href={`/notes/${n.slug}.md`}>Markdown</a> · Licensed{" "}
          <a href={site.license.url} rel="license">{site.license.name}</a>
        </p>
      </section>
      {related.length > 0 && (
        <section>
          <h2>Related essays</h2>
          <EssayList essays={related} />
        </section>
      )}
    </article>
  );
}
