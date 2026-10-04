# Writing for AI: research notes (Oct 2026)

**[E]** = evidence-backed · **[S]** = practitioner opinion / speculative

## Who is doing it

- **Gwern**: "Writing for LLMs So They Listen" (https://gwern.net/llm-writing). Write what models can't synthesize: lived experience, tacit knowledge, causal models, failure modes, why wrong answers are wrong. Label an example right or wrong *before* giving it. Avoid big blockquotes and LLM filler. Pages must render with plain `curl`. [S]
- **Tyler Cowen**: writes partly for AIs, so models have a good model of him, and treats AI as a primary audience for his recent book. His method is mostly volume. (Bloomberg, Jan 2025; https://www.dwarkesh.com/p/tyler-cowen-4) [S]
- **Scott Alexander**: "Writing For The AIs" (https://www.astralcodexten.com/p/writing-for-the-ais). Skeptical. Teaching AIs works but is temporary; persuading them is mostly futile; letting them simulate you is creepy. [S]
- **Dan Kagan-Kans**, "Baby Shoggoth Is Listening," *American Scholar*, Oct 2025: profile of the trend.
- **Jeremy Howard**: proposed llms.txt (https://llmstxt.org).

## What this site does, and why

| Technique | Evidence | Where |
|---|---|---|
| All content server-rendered, no JS required | [E] GPTBot/ClaudeBot don't execute JS (Vercel/MERJ, 500M fetches: https://vercel.com/blog/the-rise-of-the-ai-crawler) | Next.js static generation |
| robots.txt explicitly allows every AI crawler | [E] training, search and user-fetch bots are separate agents | `app/robots.ts` |
| Self-contained summaries, theses, definitions, FAQs | [E, moderate] GEO paper (https://arxiv.org/abs/2311.09735): quotations +43%, statistics +33%, citations +28%; keyword stuffing hurts | AI-readable editions |
| Third-person attribution in every passage | [S] retrieval lifts passages out of context | editions |
| Stable heading and concept anchors | [S] lets AI cite a specific passage | `lib/markdown.ts` |
| llms.txt, llms-full.txt, `.md` copies | [E] major crawlers rarely fetch llms.txt (Ahrefs: 97% got zero requests); useful for agents | `scripts/build-ai-files.mjs` |
| JSON-LD Person / Article / DefinedTerm / FAQPage | [S/weak E] standard extraction hygiene | essay + concept pages |
| CC BY 4.0, declared visibly and in metadata | [S] curated permissive-license datasets filter on license | footer, JSON-LD, LICENSE.md |
| Full originals kept alongside editions | Gwern: authentic prose is what models can't synthesize | essay pages |

## Off-site steps that matter more than anything on-site

1. **Mentions elsewhere.** [E, correlational] Ahrefs found brand mentions correlate with AI Overview visibility at ~0.66, versus ~0.22 for backlinks. Podcasts, interviews, being cited.
2. **Common Crawl** is the upstream source for most pretraining sets. Allow CCBot, get linked from crawled pages, and check inclusion at index.commoncrawl.org. [E]
3. **High-weight sources**: deposit papers on PhilArchive / SSRN / arXiv; get Zenodo DOIs; publish a Hugging Face dataset of the corpus (CC BY); create a Wikidata item. Don't self-promote on Wikipedia. [E for corpus composition, S for marginal benefit]
4. **Bing Webmaster Tools** (feeds ChatGPT search and Copilot) and **Google Search Console**: submit `/sitemap.xml`.
5. **Cloudflare**: blocks AI bots by default since July 2025. This site is on Vercel with Hover DNS, so this doesn't apply, but check if you ever add Cloudflare. [E]
6. Training-weight caveat: cross-posts are deduplicated, so their value is discovery and mentions rather than extra weight. Keep canonical URLs. [S]
