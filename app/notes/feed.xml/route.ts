import { noteItems } from "@/lib/feeds";
import { rss } from "@/lib/rss";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return rss({
    title: `${site.name}: Notes`,
    path: "/notes/feed.xml",
    description: `Short, exploratory notes by ${site.name}, in full.`,
    items: noteItems(),
  });
}
