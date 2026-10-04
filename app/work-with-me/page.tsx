import type { Metadata } from "next";
import Link from "next/link";
import { loadAuthor } from "@/lib/corpus.mjs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work with me",
  description: `Invite ${site.name} to give a talk, join a podcast or panel, collaborate on research, or engage philosophically with your team or project.`,
  alternates: { canonical: "/work-with-me" },
};

export default function WorkWithMe() {
  const author = loadAuthor();
  return (
    <>
      <section className="prose">
        <h1>Work with me</h1>
        <p className="lede">
          I&rsquo;m looking for people who take the philosophy of technology seriously as a practical
          matter: organizers, researchers, builders, funders, hosts and fellow writers.
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
