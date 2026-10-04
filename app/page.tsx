import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { loadAuthor, loadEssays } from "@/lib/corpus.mjs";
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

      <section>
        <h2>All essays</h2>
        <EssayList essays={essays.filter((e) => !START_HERE.includes(e.slug))} />
      </section>
    </>
  );
}
