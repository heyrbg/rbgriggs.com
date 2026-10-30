import type { Metadata } from "next";
import Link from "next/link";
import { getEssay, loadSoftware } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { personId } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Software",
  description: `Software ${site.name} develops at Praxica Labs in service of philosophical research: ChatStorm and the Reverse Turing Test.`,
  alternates: { canonical: "/software" },
};

export default function SoftwarePage() {
  const { intro, projects } = loadSoftware();
  return (
    <>
      <JsonLd
        data={projects.map((p) => ({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: p.name,
          description: p.summary,
          url: p.site || p.praxica,
          ...(p.source ? { codeRepository: p.source } : {}),
          applicationCategory: "Research software",
          license: p.license,
          author: { "@type": "Person", "@id": personId, name: site.name },
          publisher: { "@type": "Organization", name: site.org.name, url: site.org.url },
        }))}
      />
      <h1>Software</h1>
      <div className="prose lede" dangerouslySetInnerHTML={{ __html: renderMarkdown(intro) }} />
      <ul className="essay-list">
        {projects.map((p) => {
          const essay = p.essay ? getEssay(p.essay) : null;
          return (
            <li key={p.name} className="prose">
              <a className="title" href={p.praxica}>{p.name}</a>
              <p style={{ color: "var(--text)", fontStyle: "italic" }}>{p.tagline}</p>
              <p style={{ color: "var(--text)" }}>{p.summary}</p>
              <p className="meta">
                <a href={p.praxica}>On praxica.com</a>
                {p.site && <> · <a href={p.site}>{p.site.replace(/^https?:\/\/(www\.)?|\/$/g, "")}</a></>}
                {p.source && <> · <a href={p.source}>Source</a></>}
                {p.license && <> · {p.license}</>}
              </p>
              {essay && (
                <p className="meta">
                  Related essay: <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
