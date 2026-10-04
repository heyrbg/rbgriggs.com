import type { Metadata } from "next";
import Link from "next/link";
import { conceptId, loadConcepts } from "@/lib/corpus.mjs";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Key concepts",
  description: `A glossary of concepts coined or distinctively defined by ${site.name}, each linked to the essay where it is developed.`,
  alternates: { canonical: "/concepts", types: { "text/markdown": "/concepts.md" } },
};

export default function ConceptsPage() {
  const concepts = loadConcepts();
  // A term defined in more than one essay keeps its anchor on the first entry only.
  const seen = new Set<string>();
  const anchor = (term: string) => {
    const id = conceptId(term);
    if (seen.has(id)) return undefined;
    seen.add(id);
    return id;
  };
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: `Key concepts in the work of ${site.name}`,
          url: `${site.url}/concepts`,
          hasDefinedTerm: concepts.map((c) => ({
            "@type": "DefinedTerm",
            name: c.term,
            description: c.definition,
            url: `${site.url}/essays/${c.slug}#${conceptId(c.term)}`,
          })),
        }}
      />
      <h1>Key concepts</h1>
      <p className="lede prose">
        Terms coined or distinctively defined across {site.name}&rsquo;s essays. Each links to the essay
        where the idea is developed.
      </p>
      <dl className="concepts prose">
        {concepts.map((c) => (
          <div key={`${c.slug}-${c.term}`} id={anchor(c.term)}>
            <dt>{c.term}</dt>
            <dd>
              {c.definition}
              <span className="source meta">
                From <Link href={`/essays/${c.slug}#${conceptId(c.term)}`}>{c.essay}</Link>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
