// Prepares the data for the Writing Desk artifact (a private dashboard of notes and ideas).
// Writes one JSON file per database document to .desk/ and prints the batch entries.
//   node scripts/desk-sync.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const ROOT = process.cwd();
const OUT = path.join(ROOT, ".desk");
const SITE = "https://rbgriggs.com";
const REPO = "https://github.com/heyrbg/rbgriggs.com";
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const git = (...args) => {
  try { return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim(); } catch { return ""; }
};
const dirty = (file) => git("status", "--porcelain", "--", file) !== "";
const anchor = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const essayTitles = Object.fromEntries(
  fs.readdirSync(path.join(ROOT, "content/originals")).map((f) => {
    const d = matter(fs.readFileSync(path.join(ROOT, "content/originals", f), "utf8")).data;
    return [f.replace(/\.md$/, ""), d.title];
  }),
);

// --- notes -----------------------------------------------------------------
const notes = fs
  .readdirSync(path.join(ROOT, "content/notes"))
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((f) => {
    const rel = `content/notes/${f}`;
    const { data, content } = matter(fs.readFileSync(path.join(ROOT, rel), "utf8"));
    const slug = f.replace(/\.md$/, "");
    const body = content.replace(/<!--[\s\S]*?-->/g, "").trim();
    const log = git("log", "--follow", "--format=%cI", "--", rel).split("\n").filter(Boolean);
    return {
      slug,
      title: String(data.title ?? slug).trim(),
      summary: String(data.summary ?? "").trim(),
      status: data.draft ? "draft" : "published",
      date: String(data.date ?? ""),
      created: log.at(-1) ?? null,
      updated: log[0] ?? null,
      revisions: log.length,
      uncommitted: dirty(rel),
      words: body.split(/\s+/).filter(Boolean).length,
      tags: data.tags ?? [],
      related: (data.related ?? []).map((s) => ({ slug: s, title: essayTitles[s] ?? s })),
      idea: data.idea || null,
      url: data.draft ? null : `${SITE}/notes/${slug}`,
      github: `${REPO}/blob/main/${rel}`,
      body,
    };
  });

// --- ideas, one document per essay -----------------------------------------
const noteByIdea = Object.fromEntries(notes.filter((n) => n.idea).map((n) => [n.idea, n]));
const ideaDocs = fs
  .readdirSync(path.join(ROOT, "docs/ideas"))
  .filter((f) => f.endsWith(".md") && f === f.toLowerCase())
  .map((f) => {
    const slug = f.replace(/\.md$/, "");
    const ideas = fs
      .readFileSync(path.join(ROOT, "docs/ideas", f), "utf8")
      .split(/^## /m)
      .slice(1)
      .map((sec) => {
        const field = (k) => (sec.match(new RegExp(`\\*\\*${k}:\\*\\*\\s*(.*)`))?.[1] ?? "").trim();
        const name = sec.split("\n")[0].trim();
        const id = `${slug}#${anchor(name)}`;
        const note = noteByIdea[id];
        return {
          id,
          name,
          type: field("Type"),
          claim: field("Claim"),
          title: field("Micro-article").split(" · ")[0].replace(/^["*]+|["*]+$/g, ""),
          strength: Number(field("Strength").match(/\d/)?.[0] ?? 0),
          status: note ? (note.status === "published" ? "published" : "drafting") : "untouched",
          note: note ? note.slug : null,
        };
      });
    return { slug, essay: essayTitles[slug] ?? slug, url: `${SITE}/essays/${slug}`, ideas };
  });

// --- write files and batch entries -----------------------------------------
const writes = [];
const put = (collection, doc_id, data) => {
  const file = path.join(OUT, collection, `${doc_id}.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 1));
  writes.push({ op: "set", collection, doc_id, file_path: file });
};
for (const n of notes) put("notes", n.slug, n);
for (const d of ideaDocs) put("ideas", d.slug, d);
put("meta", "sync", {
  synced_at: new Date().toISOString(),
  commit: git("rev-parse", "--short", "HEAD"),
  notes: notes.length,
  drafts: notes.filter((n) => n.status === "draft").length,
  ideas: ideaDocs.reduce((s, d) => s + d.ideas.length, 0),
});
fs.writeFileSync(path.join(OUT, "writes.json"), JSON.stringify(writes, null, 1));
console.log(`${notes.length} notes, ${ideaDocs.length} idea docs → ${writes.length} writes in .desk/writes.json`);
console.log(`batch size ≈ ${Math.round(writes.reduce((s, w) => s + fs.statSync(w.file_path).size, 0) / 1024)} KB`);
