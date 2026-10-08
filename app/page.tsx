import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { loadAuthor, loadEssays, loadNotes } from "@/lib/corpus.mjs";
import { renderMarkdown } from "@/lib/markdown";
import { personSchema, websiteSchema } from "@/lib/schema";
import { EssayList } from "@/components/EssayList";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const START_HERE = ["manifesto", "the-high-dimensional-society", "the-plurality-a-better-myth-for-ai", "a-constraint-theory-of-technology"];

function overview(): string | null {
  const file = path.join(process.cwd(), "content", "overview.md");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

export default function Home() {
  const author = loadAuthor();
  const essays = loadEssays();
  const start = START_HERE.map((s) => essays.find((e) => e.slug === s)).filter((e) => e !== undefined);
  const ov = overview();
  const notes = loadNotes().slice(0, 5);

  return (
    <>
      <JsonLd data={[personSchema(author.short_bio, author.interests), websiteSchema()]} />
      <section className="prose">
        <h1>{site.name}</h1>
        <p className="subtitle">{site.tagline}</p>
        <p className="lede">{author.short_bio}</p>
        <p>
          <Link className="button" href="/work-with-me">Invite me to speak or collaborate</Link>
        </p>
      </section>

      {ov && <section className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(ov) }} />}

      <section>
        <h2>Start here</h2>
        <EssayList essays={start} />
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

      <section>
        <h2>All essays</h2>
        <EssayList essays={essays.filter((e) => !START_HERE.includes(e.slug))} />
      </section>
    </>
  );
}
