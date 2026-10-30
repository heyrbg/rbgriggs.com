import Link from "next/link";
import { loadAuthor, loadEssays, loadNotes, START_HERE } from "@/lib/corpus.mjs";
import { personSchema, websiteSchema } from "@/lib/schema";
import { EssayList } from "@/components/EssayList";
import { JsonLd } from "@/components/JsonLd";
import { Bio } from "@/components/Bio";
import { loadNow } from "@/lib/projects.mjs";
import { site } from "@/lib/site";

export default function Home() {
  const author = loadAuthor();
  const essays = loadEssays();
  const start = START_HERE.map((s) => essays.find((e) => e.slug === s)).filter((e) => e !== undefined);
  const notes = loadNotes().slice(0, 5);
  const now = loadNow();

  return (
    <>
      <JsonLd data={[personSchema(author.short_bio, author.interests, author.offerings), websiteSchema()]} />
      <section className="prose">
        <h1>{site.name}</h1>
        <p className="subtitle">{site.tagline}</p>
        <p className="lede"><Bio text={author.short_bio} /></p>
        <p>
          <Link className="button" href="/work-with-me">Consulting, advising and collaboration</Link>
        </p>
      </section>

      {now.items.length > 0 && (
        <section>
          <h2>Currently working on</h2>
          <ul className="essay-list">
            {now.items.map((i) => (
              <li key={i.title}>
                {i.href ? <Link className="title" href={i.href}>{i.title}</Link> : <span className="title" style={{ fontSize: "1.3rem" }}>{i.title}</span>}
                <p>{i.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Start here</h2>
        <EssayList essays={start} />
        <p><Link href="/essays">All {essays.length} essays →</Link></p>
      </section>

      {notes.length > 0 && (
        <section>
          <h2>Recent notes</h2>
          <ul className="essay-list">
            {notes.map((n) => (
              <li key={n.slug}>
                <p className="meta" style={{ margin: 0 }}><time dateTime={n.date}>{n.date}</time></p>
                <Link className="title" href={`/notes/${n.slug}`}>{n.title}</Link>
                {n.summary && <p>{n.summary}</p>}
              </li>
            ))}
          </ul>
          <p><Link href="/notes">All notes →</Link></p>
        </section>
      )}
    </>
  );
}
