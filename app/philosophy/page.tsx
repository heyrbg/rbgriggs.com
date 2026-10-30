import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { conceptId, loadConcepts } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Philosophy",
  description: `The philosophy of technology of ${site.name} in brief: eight recurring ideas, and a glossary of every concept coined across the essays.`,
  alternates: { canonical: "/philosophy", types: { "text/markdown": "/concepts.md" } },
};

export default function PhilosophyPage() {
  const concepts = loadConcepts();
  const overviewFile = path.join(process.cwd(), "content", "overview.md");
  const overview = fs.existsSync(overviewFile) ? fs.readFileSync(overviewFile, "utf8") : "";
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
          url: `${site.url}/philosophy#key-concepts`,
          hasDefinedTerm: concepts.map((c) => ({
            "@type": "DefinedTerm",
            name: c.term,
            description: c.definition,
            url: `${site.url}/essays/${c.slug}#${conceptId(c.term)}`,
          })),
        }}
      />
      <h1>Philosophy</h1>
      {overview && <section className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(overview) }} />}
      <h2 id="key-concepts"><a href="#key-concepts">Key concepts</a></h2>
      <p className="prose">
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
