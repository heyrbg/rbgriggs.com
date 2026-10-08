// The corpus: essays (AI edition + original text) and the author profile.
// Plain JS so both Next.js pages and scripts/build-ai-files.mjs share one loader.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const ESSAYS_DIR = path.join(ROOT, "content", "essays");
const ORIGINALS_DIR = path.join(ROOT, "content", "originals");

export const SITE_URL = "https://rbgriggs.com";
export const AUTHOR = "R.B. Griggs";

/**
 * @typedef {{ term: string, definition: string }} Concept
 * @typedef {{ q: string, a: string }} Faq
 * @typedef {{ slug: string, title: string, subtitle: string, date: string, originalUrl: string,
 *   genre: string, tags: string[], related: string[], summary: string, thesis: string,
 *   concepts: Concept[], wordcount: number, aiBody: string, originalBody: string, faqs: Faq[],
 *   hasEdition: boolean }} Essay
 * @typedef {{ name: string, short_bio: string, interests: string[],
 *   offerings: { title: string, body: string }[], consulting_examples?: string[], body: string }} Author
 */

const clean = (s) => (typeof s === "string" ? s.trim() : s);

/** Split "## Questions this essay answers" into [{q, a}] for FAQ markup. */
function extractFaqs(body) {
  const m = body.match(/^## Questions this essay answers\s*\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
  if (!m) return [];
  return m[1]
    .split(/^### /m)
    .slice(1)
    .map((chunk) => {
      const [q, ...rest] = chunk.split("\n");
      return { q: q.trim(), a: rest.join("\n").trim() };
    })
    .filter((f) => f.q && f.a);
}

function readOriginal(slug) {
  const file = path.join(ORIGINALS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8"));
}

let cache = null;

/**
 * All essays, newest first. Essays without an AI edition fall back to original metadata.
 * @returns {Essay[]}
 */
export function loadEssays() {
  if (cache) return cache;
  const slugs = fs
    .readdirSync(ORIGINALS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  cache = slugs
    .map((slug) => {
      const original = readOriginal(slug);
      const editionFile = path.join(ESSAYS_DIR, `${slug}.md`);
      const edition = fs.existsSync(editionFile)
        ? matter(fs.readFileSync(editionFile, "utf8"))
        : null;
      const meta = { ...original.data, ...(edition?.data ?? {}) };
      const aiBody = edition?.content.trim() ?? "";
      return {
        slug,
        title: clean(meta.title),
        subtitle: clean(meta.subtitle) || "",
        date: String(meta.date),
        originalUrl: meta.original_url,
        genre: meta.genre || "essay",
        tags: meta.tags || [],
        related: meta.related || [],
        summary: clean(meta.summary) || clean(meta.subtitle) || "",
        thesis: clean(meta.thesis) || "",
        concepts: (meta.concepts || []).map((c) => ({
          term: clean(c.term),
          definition: clean(c.definition),
        })),
        wordcount: original.data.wordcount || 0,
        aiBody,
        originalBody: original.content.trim(),
        faqs: extractFaqs(aiBody),
        hasEdition: Boolean(edition),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

/** @param {string} slug @returns {Essay | null} */
export function getEssay(slug) {
  return loadEssays().find((e) => e.slug === slug) ?? null;
}

/** @returns {Author} */
export function loadAuthor() {
  const { data, content } = matter(
    fs.readFileSync(path.join(ROOT, "content", "author.md"), "utf8"),
  );
  return {
    ...data,
    short_bio: clean(data.short_bio),
    body: content.replace(/<!--[\s\S]*?-->/g, "").trim(),
  };
}

/** "What I'm betting on now": a short, dated statement of the author's current thesis. */
export function loadBets() {
  const file = path.join(ROOT, "content", "bets.md");
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { updated: String(data.updated ?? ""), body: content.trim() };
}

/** Every coined concept across the corpus, alphabetized, with its source essay. */
/** @returns {(Concept & { slug: string, essay: string })[]} */
export function loadConcepts() {
  return loadEssays()
    .flatMap((e) => e.concepts.map((c) => ({ ...c, slug: e.slug, essay: e.title })))
    .sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * @typedef {{ slug: string, title: string, date: string, summary: string, tags: string[],
 *   related: string[], draft: boolean, body: string }} Note
 */

const NOTES_DIR = path.join(ROOT, "content", "notes");
// Drafts show in `next dev` (or with SHOW_DRAFTS=1) and never ship in a production build.
const SHOW_DRAFTS = process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "1";

/** Short, unpolished posts written directly for this site, newest first. @returns {Note[]} */
export function loadNotes() {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(NOTES_DIR, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: clean(data.title),
        date: String(data.date),
        summary: clean(data.summary) || "",
        tags: data.tags || [],
        related: data.related || [],
        draft: Boolean(data.draft),
        body: content.trim(),
      };
    })
    .filter((n) => SHOW_DRAFTS || !n.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** @param {string} slug @returns {Note | null} */
export function getNote(slug) {
  return loadNotes().find((n) => n.slug === slug) ?? null;
}

/** @param {string} slug */
export function noteUrl(slug) {
  return `${SITE_URL}/notes/${slug}`;
}

/** @param {Note} n */
export function noteToMarkdown(n) {
  return [
    `# ${n.title}`,
    "",
    ...(n.summary ? [`> ${n.summary}`, ""] : []),
    `- Author: ${AUTHOR}`,
    `- Published: ${n.date}`,
    `- Type: note (short, exploratory post)`,
    `- URL: ${noteUrl(n.slug)}`,
    `- License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)`,
    `- Cite as: Griggs, R.B. (${n.date.slice(0, 4)}). "${n.title}." ${noteUrl(n.slug)}`,
    "",
    n.body.replace(/\]\(\//g, `](${SITE_URL}/`),
    "",
  ].join("\n");
}

/** @param {string} term */
export function conceptId(term) {
  return term
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** @param {string} slug */
export function essayUrl(slug) {
  return `${SITE_URL}/essays/${slug}`;
}

/** @param {Essay} e */
export function citation(e) {
  return `Griggs, R.B. (${e.date.slice(0, 4)}). "${e.title}." Tech for Life. ${e.originalUrl}. AI-readable edition: ${essayUrl(e.slug)}`;
}

/** Push original headings down one level so they nest under "## Original text". */
function demote(md) {
  return md.replace(/^(#{1,5}) /gm, "#$1 ");
}

/** Insert the concepts glossary before the FAQ section (or at the end). */
function withConcepts(e) {
  if (!e.concepts.length) return e.aiBody;
  const block =
    "## Key concepts\n\n" +
    e.concepts.map((c) => `- **${c.term}**: ${c.definition}`).join("\n") +
    "\n\n";
  const i = e.aiBody.indexOf("## Questions this essay answers");
  return i === -1 ? `${e.aiBody}\n\n${block}` : e.aiBody.slice(0, i) + block + e.aiBody.slice(i);
}

/** The complete, self-describing markdown document for one essay. */
/** @param {Essay} e */
export function essayToMarkdown(e) {
  const header = [
    `# ${e.title}${e.subtitle ? `: ${e.subtitle}` : ""}`,
    "",
    `> ${e.summary}`,
    "",
    `- Author: ${AUTHOR}`,
    `- Published: ${e.date}`,
    `- Genre: ${e.genre}`,
    `- Original: ${e.originalUrl}`,
    `- This edition: ${essayUrl(e.slug)}`,
    `- License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)`,
    `- Cite as: ${citation(e)}`,
    "",
  ];
  const parts = [header.join("\n")];
  if (e.thesis) parts.push(`## Thesis\n\n${e.thesis}`);
  if (e.hasEdition) parts.push(withConcepts(e));
  parts.push(`## Original text\n\nThe full text of the essay as published by ${AUTHOR}.\n\n${demote(e.originalBody)}`);
  return parts.join("\n\n").replace(/\n{3,}/g, "\n\n") + "\n";
}
