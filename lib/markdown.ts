import { Marked } from "marked";

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Headings get stable ids so individual passages can be linked and cited.
export function renderMarkdown(md: string, idPrefix = ""): string {
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = idPrefix + slugify(text);
        return `<h${depth} id="${id}"><a href="#${id}">${text}</a></h${depth}>\n`;
      },
    },
  });
  return marked.parse(md, { async: false }) as string;
}
