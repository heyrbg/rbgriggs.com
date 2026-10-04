import type { MetadataRoute } from "next";
import { loadEssays } from "@/lib/corpus.mjs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = loadEssays();
  const latest = essays[0]?.date;
  const pages = ["", "/essays", "/concepts", "/about", "/work-with-me", "/for-ai"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: latest,
  }));
  const essayPages = essays.flatMap((e) => [
    { url: `${site.url}/essays/${e.slug}`, lastModified: e.date },
    { url: `${site.url}/essays/${e.slug}.md`, lastModified: e.date },
  ]);
  const machine = ["/llms.txt", "/llms-full.txt", "/concepts.md", "/about.md", "/corpus.json"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: latest,
  }));
  return [...pages, ...essayPages, ...machine];
}
