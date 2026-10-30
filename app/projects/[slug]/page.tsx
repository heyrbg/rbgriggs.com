import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, loadProjects } from "@/lib/projects.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { personId } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return loadProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} (${p.kind.toLowerCase()} in progress)`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: "website", title: p.title, description: p.summary },
  };
}

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const url = `${site.url}/projects/${p.slug}`;
  return (
    <article className="prose">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": p.kind === "Book" ? "Book" : "CreativeWork",
          name: p.title,
          description: p.summary,
          url,
          author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
          creativeWorkStatus: p.status,
          ...(p.started ? { dateCreated: p.started } : {}),
          ...(p.essay ? { isBasedOn: `${site.url}/essays/${p.essay}` } : {}),
        }}
      />
      <p className="kicker">
        <span className="label">{p.kind}</span> · {p.status}
        {p.event && <> · <a href={p.event.url}>{p.event.name}</a></>} · by{" "}
        <Link href="/about" rel="author">{site.name}</Link>
      </p>
      <h1>{p.title}</h1>
      <p className="lede">{p.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
      <div className="card">
        <p className="label">Follow along</p>
        <p>
          Notes as they're written: <a href="/notes/feed.xml">notes RSS</a>. To talk about the book, see{" "}
          <Link href="/work-with-me">Work with me</Link>.
        </p>
      </div>
    </article>
  );
}
