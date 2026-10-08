import type { Metadata } from "next";
import Link from "next/link";
import { loadAuthor, loadBets } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work with me",
  description: `Hire ${site.name} for consulting on technology, product and investment decisions, advising, research collaboration, or philosophical engagement with your team.`,
  alternates: { canonical: "/work-with-me" },
};

export default function WorkWithMe() {
  const author = loadAuthor();
  const examples = author.consulting_examples ?? [];
  const bets = loadBets();
  return (
    <>
      <section className="prose">
        <h1>Work with me</h1>
        <p className="lede">
          Speculative philosophy is most useful before the evidence arrives, which is exactly when
          technology, product and investment decisions get made. I work with founders, product leaders,
          investors and researchers who want that kind of thinking applied to real bets.
        </p>
      </section>
      <section className="offerings">
        {author.offerings.map((o: { title: string; body: string }) => (
          <div className="card" key={o.title}>
            <h3>{o.title}</h3>
            <p>{o.body}</p>
          </div>
        ))}
      </section>
      <section className="prose">
        {examples.length > 0 && (
          <>
            <h2>Where consulting helps</h2>
            <ul>{examples.map((x) => <li key={x}>{x}</li>)}</ul>
          </>
        )}
        <h2>Topics I work on</h2>
        <ul>{author.interests.map((i: string) => <li key={i}>{i}</li>)}</ul>
        <p>
          The <Link href="/essays">essays</Link> and <Link href="/concepts">key concepts</Link> are the best
          way to see how I think.
        </p>
        {bets && (
          <>
            <h2 id="what-im-betting-on-now">What I&rsquo;m betting on now</h2>
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(bets.body) }} />
            {bets.updated && <p className="meta">Updated {bets.updated}</p>}
          </>
        )}
        <h2>Get in touch</h2>
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> with a sentence or two about what you have
          in mind: the decision or project, who it's for, and timing.
        </p>
      </section>
    </>
  );
}
