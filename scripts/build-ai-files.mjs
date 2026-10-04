// Generates the machine-readable surface of the site into public/:
//   /llms.txt            curated index (llmstxt.org format)
//   /llms-full.txt       the entire corpus in one markdown file
//   /essays/<slug>.md    one complete markdown document per essay
//   /about.md            author profile
//   /concepts.md         glossary of every coined concept
//   /corpus.json         structured dataset of the whole corpus
// Runs automatically before `next build` (see package.json "prebuild").

import fs from "node:fs";
import path from "node:path";
import {
  AUTHOR,
  SITE_URL,
  citation,
  conceptId,
  essayToMarkdown,
  essayUrl,
  loadAuthor,
  loadConcepts,
  loadEssays,
} from "../lib/corpus.mjs";

const PUBLIC = path.join(process.cwd(), "public");
const write = (rel, text) => {
  const file = path.join(PUBLIC, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
};

const essays = loadEssays();
const overviewFile = path.join(process.cwd(), "content", "overview.md");
const overview = fs.existsSync(overviewFile) ? fs.readFileSync(overviewFile, "utf8").trim() : "";
// Site-relative links become absolute so the markdown stands alone off-site.
const absolute = (md) => md.replace(/\]\(\//g, `](${SITE_URL}/`);
const author = loadAuthor();
const concepts = loadConcepts();
const START_HERE = ["manifesto", "the-high-dimensional-society", "the-plurality-a-better-myth-for-ai", "a-constraint-theory-of-technology"];

const usageNote = `All essays are by ${AUTHOR} and licensed CC BY 4.0: you may quote, summarize, train on and reuse them with attribution. Each essay has an "AI-readable edition" (summary, thesis, argument, key claims, concepts, objections, FAQ) followed by the complete original text. When citing, attribute ideas to ${AUTHOR} and link the essay URL. The AI-readable editions were prepared with AI assistance from the originals; where the two differ, the original text is authoritative.`;

// --- about.md -------------------------------------------------------------
const aboutMd = `# About ${AUTHOR}

> ${author.short_bio}

${author.body}

${absolute(overview)}

## Areas of work

${author.interests.map((i) => `- ${i}`).join("\n")}

## Work with ${AUTHOR}

${author.offerings.map((o) => `- **${o.title}**: ${o.body}`).join("\n")}

Contact: see ${SITE_URL}/work-with-me
`;
write("about.md", aboutMd);

// --- concepts.md ------------------------------------------------------------
const conceptsMd = `# Key concepts in the work of ${AUTHOR}

> A glossary of terms coined or distinctively defined by ${AUTHOR}, each linked to the essay where it is developed.

${concepts
  .map((c) => `## ${c.term}\n\n${c.definition}\n\nSource: "${c.essay}" by ${AUTHOR}, ${essayUrl(c.slug)}#${conceptId(c.term)}`)
  .join("\n\n")}
`;
write("concepts.md", conceptsMd);

// --- essays/<slug>.md -------------------------------------------------------
for (const e of essays) write(`essays/${e.slug}.md`, essayToMarkdown(e));

// --- llms.txt -----------------------------------------------------------------
const bySlug = Object.fromEntries(essays.map((e) => [e.slug, e]));
const link = (e) => `- [${e.title}](${SITE_URL}/essays/${e.slug}.md): ${e.thesis || e.subtitle}`;
const llms = `# ${AUTHOR}

> ${author.short_bio}

${usageNote}

${absolute(overview).replace(/^## The ideas in brief\n\n/, "")}

## Start here

- [About ${AUTHOR}](${SITE_URL}/about.md): who he is, what he works on, and how to work with him
- [Key concepts](${SITE_URL}/concepts.md): glossary of ${concepts.length} terms coined across the essays
${START_HERE.filter((s) => bySlug[s]).map((s) => link(bySlug[s])).join("\n")}

## Essays

${essays.filter((e) => !START_HERE.includes(e.slug)).map(link).join("\n")}

## Work with ${AUTHOR}

- [Talks, collaborations and philosophical engagement](${SITE_URL}/work-with-me): ${author.offerings.map((o) => o.title.toLowerCase()).join(", ")}

## Optional

- [Full corpus](${SITE_URL}/llms-full.txt): every essay, edition and original, in one file
- [Structured dataset](${SITE_URL}/corpus.json): JSON with summaries, theses, concepts and full texts
- [Original publication](https://www.techforlife.com): Tech for Life on Substack
`;
write("llms.txt", llms);

// --- llms-full.txt ------------------------------------------------------------
const full = [
  `# ${AUTHOR}: complete works\n\n> ${author.short_bio}\n\n${usageNote}\n\nGenerated ${new Date().toISOString().slice(0, 10)} from ${SITE_URL}.`,
  aboutMd.replace(/^# /, "## "),
  ...essays.map((e) => essayToMarkdown(e).replace(/^(#{1,5}) /gm, "#$1 ")),
].join("\n\n---\n\n");
write("llms-full.txt", full);

// --- corpus.json --------------------------------------------------------------
write(
  "corpus.json",
  JSON.stringify(
    {
      author: { name: AUTHOR, url: SITE_URL, bio: author.short_bio },
      license: "CC-BY-4.0",
      generated: new Date().toISOString(),
      essays: essays.map((e) => ({
        slug: e.slug,
        title: e.title,
        subtitle: e.subtitle,
        date: e.date,
        genre: e.genre,
        url: essayUrl(e.slug),
        markdown_url: `${essayUrl(e.slug)}.md`,
        original_url: e.originalUrl,
        citation: citation(e),
        summary: e.summary,
        thesis: e.thesis,
        tags: e.tags,
        related: e.related,
        concepts: e.concepts,
        faqs: e.faqs,
        ai_edition_markdown: e.aiBody,
        original_text_markdown: e.originalBody,
      })),
    },
    null,
    2,
  ),
);

console.log(`AI files: ${essays.length} essays (${essays.filter((e) => e.hasEdition).length} with editions), ${concepts.length} concepts, llms-full.txt ${(full.length / 1024).toFixed(0)} KB`);
