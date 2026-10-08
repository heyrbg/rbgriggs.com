import type { Metadata } from "next";
import Link from "next/link";
import { loadAuthor } from "@/lib/corpus.mjs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work with me",
  description: `Hire ${site.name} for consulting on technology, product and investment decisions, or invite him to speak, collaborate on research, or engage philosophically with your team.`,
  alternates: { canonical: "/work-with-me" },
};

export default function WorkWithMe() {
  const author = loadAuthor();
  const consulting = author.offerings.find((o) => o.title === "Consulting") ?? author.offerings[0];
  const others = author.offerings.filter((o) => o !== consulting);
  const examples = author.consulting_examples ?? [];
  return (
    <>
      <section className="prose">
        <h1>Work with me</h1>
        <p className="lede">
          Speculative philosophy is most useful before the evidence arrives, which is exactly when
          technology, product and investment decisions get made. I work with founders, product leaders,
          investors, organizers and researchers who want that kind of thinking applied to real bets.
        </p>
      </section>
      <section className="card thesis prose">
        <p className="label">Consulting</p>
        <p>{consulting.body}</p>
        {examples.length > 0 && (
          <>
            <p><strong>Where it helps:</strong></p>
            <ul>{examples.map((x) => <li key={x}>{x}</li>)}</ul>
          </>
        )}
        <p>
          <a className="button" href={`mailto:${site.email}?subject=Consulting`}>Discuss a project</a>
        </p>
      </section>
      <section className="offerings">
        {others.map((o: { title: string; body: string }) => (
          <div className="card" key={o.title}>
            <h3>{o.title}</h3>
            <p>{o.body}</p>
          </div>
        ))}
      </section>
      <section className="prose">
        <h2>Topics I speak and write on</h2>
        <ul>{author.interests.map((i: string) => <li key={i}>{i}</li>)}</ul>
        <p>
          The <Link href="/essays">essays</Link> and <Link href="/concepts">key concepts</Link> are the best
          way to see how I think.
        </p>
        <h2>Get in touch</h2>
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> with a sentence or two about what you have
          in mind: the event or project, the audience, and timing.
        </p>
      </section>
    </>
  );
}
