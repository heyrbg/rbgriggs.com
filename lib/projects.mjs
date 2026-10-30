// Long-form projects in progress (books and the like), one markdown file each in content/projects/.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "projects");

/**
 * @typedef {{ slug: string, title: string, kind: string, genre: string | null, status: string, started: string, summary: string,
 *   essay: string | null, event: { name: string, host: string, url: string } | null, body: string }} Project
 * @returns {Project[]}
 */
export function loadProjects() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: String(data.title).trim(),
        kind: data.kind || "Project",
        genre: data.genre || null,
        status: data.status || "In progress",
        started: String(data.started ?? ""),
        summary: String(data.summary ?? "").trim(),
        essay: data.essay || null,
        event: data.event || null,
        body: content.replace(/<!--[\s\S]*?-->/g, "").trim(),
      };
    });
}

/**
 * "Currently working on": a short, hand-ordered list shown on the home page and in llms.txt.
 * @returns {{ updated: string, items: { title: string, description: string, href?: string }[] }}
 */
export function loadNow() {
  const file = path.join(process.cwd(), "content", "now.md");
  if (!fs.existsSync(file)) return { updated: "", items: [] };
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return { updated: String(data.updated ?? ""), items: data.items || [] };
}

/** @param {string} slug */
export function getProject(slug) {
  return loadProjects().find((p) => p.slug === slug) ?? null;
}
