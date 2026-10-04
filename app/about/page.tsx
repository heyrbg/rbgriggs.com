import type { Metadata } from "next";
import Link from "next/link";
import { loadAuthor } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { personSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, writer of speculative philosophy of technology and author of Tech for Life.`,
  alternates: { canonical: "/about", types: { "text/markdown": "/about.md" } },
};

export default function AboutPage() {
  const author = loadAuthor();
  return (
    <section className="prose">
      <JsonLd data={{ ...personSchema(author.short_bio, author.interests), mainEntityOfPage: `${site.url}/about` }} />
      <h1>About {site.name}</h1>
      <p className="lede">{author.short_bio}</p>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(author.body) }} />
      <h2>Areas of work</h2>
      <ul>{author.interests.map((i: string) => <li key={i}>{i}</li>)}</ul>
      <p>
        <Link href="/work-with-me">Talks, collaborations and philosophical engagement →</Link>
      </p>
    </section>
  );
}
