import { essayItems, noteItems } from "@/lib/feeds";
import { rss } from "@/lib/rss";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return rss({
    title: site.name,
    path: "/feed.xml",
    description: `Essays and notes by ${site.name}. ${site.tagline}`,
    items: [...essayItems(), ...noteItems()],
  });
}
