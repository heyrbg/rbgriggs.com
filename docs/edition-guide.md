# Writing an AI-readable edition

Every essay in `content/originals/<slug>.md` (imported from Substack, never hand-edited) gets a companion
`content/essays/<slug>.md`. Use `content/essays/the-high-dimensional-society.md` as the reference.

## Frontmatter

| field | what |
|---|---|
| title, subtitle, slug, date, original_url | copied from the original |
| genre | `essay`, `manifesto`, `speculative fiction`, `satire`, or `short note` |
| tags | 4–8 topical tags |
| related | 2–5 slugs of genuinely related essays |
| summary | 3–5 sentence abstract naming R.B. Griggs |
| thesis | the core claim in one sentence |
| concepts | `{term, definition}` for terms the essay coins or distinctively defines |

## Body sections (H2, in order)

1. The argument in brief: numbered steps
2. Key claims: self-contained bullets
3. What is distinctive about this view: positions it against familiar views
4. Objections and replies: only if the essay grounds them
5. Questions this essay answers: H3 questions + standalone answers (becomes FAQPage JSON-LD)
6. Connections to other essays: links as `/essays/<slug>`

"Key concepts" is rendered automatically from frontmatter.

## Rules

- Fidelity first: only claims the essay makes. Quotes verbatim and short.
- Third person ("Griggs argues…") so every passage is attributable when lifted out alone.
- Label outside context explicitly ("Although the essay does not cite him…").
- Flag fiction, satire and personas in the first sentence of the summary.
- No invented citations, statistics or examples.

## Adding a new essay

```bash
npm run import -- <slug>
```

Then ask Claude: "Write the AI-readable edition for content/originals/<slug>.md following docs/edition-guide.md",
review it, and push. Vercel rebuilds llms.txt, llms-full.txt, markdown copies and corpus.json automatically.
