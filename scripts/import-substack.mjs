// Pulls every public post from the Substack API and writes the original text
// to content/originals/<slug>.md. Safe to re-run: originals are overwritten,
// AI editions in content/essays/ are never touched.
//
//   npm run import            # all posts
//   npm run import -- <slug>  # one post

import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";

const PUBLICATION = "https://www.techforlife.com";
const OUT_DIR = path.join(process.cwd(), "content", "originals");
const UA = { "User-Agent": "rbgriggs.com importer" };

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// Substack wraps images in captioned containers, adds subscribe widgets, and
// injects button/embed chrome that is noise outside of Substack.
turndown.remove(["script", "style", "svg", "button", "form"]);
turndown.addRule("dropSubstackChrome", {
  filter: (node) => {
    const cls = node.getAttribute?.("class") || "";
    return /subscription-widget|subscribe-widget|button-wrapper|captioned-button|footnote-anchor-wrapper|image-link-expand|pencraft/.test(cls);
  },
  replacement: () => "",
});
turndown.addRule("figure", {
  filter: "figure",
  replacement: (_content, node) => {
    const img = node.querySelector("img");
    const cap = node.querySelector("figcaption")?.textContent?.trim();
    if (!img) return "";
    const alt = (img.getAttribute("alt") || cap || "").replace(/\n/g, " ");
    return `\n\n![${alt}](${img.getAttribute("src")})${cap ? `\n*${cap}*` : ""}\n\n`;
  },
});

async function getJSON(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function listPosts() {
  const all = [];
  for (let offset = 0; ; offset += 50) {
    const page = await getJSON(`${PUBLICATION}/api/v1/archive?sort=new&limit=50&offset=${offset}`);
    if (!page.length) break;
    all.push(...page);
  }
  return all.filter((p) => p.audience === "everyone" && p.type === "newsletter");
}

function yamlString(s) {
  return JSON.stringify(s ?? "");
}

async function importPost(slug) {
  const p = await getJSON(`${PUBLICATION}/api/v1/posts/${slug}`);
  const body = turndown
    .turndown(p.body_html || "")
    .replace(/^(#{1,6}) \*\*(.+?)\*\*\s*$/gm, "$1 $2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const md = `---
title: ${yamlString(p.title)}
subtitle: ${yamlString(p.subtitle)}
slug: ${yamlString(p.slug)}
date: ${yamlString(p.post_date?.slice(0, 10))}
original_url: ${yamlString(p.canonical_url)}
wordcount: ${p.wordcount ?? 0}
---

${body}
`;
  await fs.writeFile(path.join(OUT_DIR, `${slug}.md`), md);
  console.log(`imported ${slug} (${p.wordcount} words)`);
}

await fs.mkdir(OUT_DIR, { recursive: true });
const only = process.argv[2];
const slugs = only ? [only] : (await listPosts()).map((p) => p.slug);
for (const slug of slugs) {
  await importPost(slug);
  await new Promise((r) => setTimeout(r, 400));
}
