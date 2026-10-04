import type { Metadata } from "next";
import { loadEssays } from "@/lib/corpus.mjs";
import { EssayList } from "@/components/EssayList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Essays",
  description: `All essays by ${site.name} on the philosophy of technology, AI, and human flourishing, each with an AI-readable edition and the full original text.`,
  alternates: { canonical: "/essays" },
};

export default function EssaysPage() {
  const essays = loadEssays();
  return (
    <>
      <h1>Essays</h1>
      <p className="lede prose">
        {essays.length} essays, originally published in <a href={site.publication.url}>Tech for Life</a>.
        Each page pairs an AI-readable edition (summary, argument, key claims, concepts, FAQ) with the
        complete original text.
      </p>
      <EssayList essays={essays} />
    </>
  );
}
