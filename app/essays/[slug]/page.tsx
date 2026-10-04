import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { citation, conceptId, essayUrl, getEssay, loadEssays } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { personId } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return loadEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const e = getEssay((await params).slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.summary,
    keywords: e.tags,
    alternates: {
      canonical: `/essays/${e.slug}`,
      types: { "text/markdown": `/essays/${e.slug}.md` },
    },
    openGraph: { type: "article", title: e.title, description: e.summary, publishedTime: e.date, authors: [site.name] },
  };
}

const FAQ_HEADING = "## Questions this essay answers";

export default async function EssayPage({ params }: Params) {
  const e = getEssay((await params).slug);
  if (!e) notFound();

  const all = loadEssays();
  const related = e.related.map((s: string) => all.find((x) => x.slug === s)).filter(Boolean);
  const split = e.aiBody.indexOf(FAQ_HEADING);
  const beforeFaq = split === -1 ? e.aiBody : e.aiBody.slice(0, split);
  const faqAndAfter = split === -1 ? "" : e.aiBody.slice(split);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${essayUrl(e.slug)}#article`,
      headline: e.title,
      alternativeHeadline: e.subtitle,
      description: e.summary,
      abstract: e.thesis,
      genre: e.genre,
      keywords: e.tags.join(", "),
      datePublished: e.date,
      inLanguage: "en",
      wordCount: e.wordcount,
      url: essayUrl(e.slug),
      mainEntityOfPage: essayUrl(e.slug),
      author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
      publisher: { "@type": "Person", "@id": personId },
      isBasedOn: e.originalUrl,
      sameAs: e.originalUrl,
      license: site.license.url,
      isAccessibleForFree: true,
      encoding: { "@type": "MediaObject", encodingFormat: "text/markdown", contentUrl: `${essayUrl(e.slug)}.md` },
      about: e.concepts.map((c: { term: string; definition: string }) => ({
        "@type": "DefinedTerm",
        name: c.term,
        description: c.definition,
        url: `${essayUrl(e.slug)}#${conceptId(c.term)}`,
      })),
    },
    ...(e.faqs.length
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: e.faqs.map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }]
      : []),
  ];

  return (
    <article>
      <JsonLd data={schema} />
      <p className="kicker">
        <span className="label">{e.genre}</span> · <time dateTime={e.date}>{e.date}</time> · {e.wordcount.toLocaleString()} words ·{" "}
        by <Link href="/about" rel="author">{site.name}</Link>
      </p>
      <h1>{e.title}</h1>
      {e.subtitle && <p className="subtitle">{e.subtitle}</p>}

      <section aria-label="Summary" className="prose">
        <p className="lede">{e.summary}</p>
        {e.thesis && (
          <div className="card thesis">
            <p className="label">Thesis</p>
            <p>{e.thesis}</p>
          </div>
        )}
        <p className="meta">
          Jump to: {e.hasEdition && <><a href="#ai-edition">AI-readable edition</a> · </>}
          <a href="#original-text">Original text</a> · <a href={`/essays/${e.slug}.md`}>Markdown</a> ·{" "}
          <a href={e.originalUrl}>Read on Substack</a>
        </p>
      </section>

      {e.hasEdition && (
        <section id="ai-edition" className="prose">
          <div className="divider label">AI-readable edition</div>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(beforeFaq) }} />
          {e.concepts.length > 0 && (
            <>
              <h2 id="key-concepts"><a href="#key-concepts">Key concepts</a></h2>
              <dl className="concepts">
                {e.concepts.map((c: { term: string; definition: string }) => (
                  <div key={c.term} id={conceptId(c.term)}>
                    <dt>{c.term}</dt>
                    <dd>{c.definition}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(faqAndAfter) }} />
        </section>
      )}

      <section id="original-text" className="prose">
        <div className="divider label">Original text</div>
        <p className="meta">
          As published in <a href={e.originalUrl}>Tech for Life</a> on {e.date}.
        </p>
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(e.originalBody, "original-") }} />
      </section>

      <section className="prose">
        <div className="card">
          <p className="label">How to cite</p>
          <p>{citation(e)}</p>
          <p className="meta">
            Licensed <a href={site.license.url} rel="license">{site.license.name}</a>.
          </p>
        </div>
        {related.length > 0 && (
          <>
            <h2>Related essays</h2>
            <ul className="essay-list">
              {related.map((r) => r && (
                <li key={r.slug}>
                  <Link className="title" href={`/essays/${r.slug}`}>{r.title}</Link>
                  <p>{r.subtitle}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </article>
  );
}
