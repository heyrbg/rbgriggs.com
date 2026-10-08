# Micro-article ideas

Each essay was read in full and broken into its distinct ideas: **213 ideas across 23 essays**, every one
anchored to a verbatim quote from the original (checked by script).

- `<slug>.md` has the ideas from one essay: claim, anchor quote, why it stands alone, suggested title and
  question, outline, prior art, connections, and strength (1–3).
- [INDEX.md](INDEX.md) is the full catalog sorted by strength (102 rated 3). Regenerate it with
  `node scripts/ideas-index.mjs`.

A micro article makes **one** idea crisp, citable and findable: 400–900 words, a title that names the idea,
a first paragraph that states it outright, then the argument, the prior art it answers, and links back to
the source essay.

## Write these first

Original coinages and theories that answer questions people already ask AI, where you have little
competition for the answer. Roughly in order.

| # | Micro article | Source | Why first |
|---|---|---|---|
| 1 | **Why Humans Guess Right: Evolutionary Attunement** | [reverse-turing-test](the-reverse-turing-test.md) | A real answer to Peirce's puzzle of abduction, currently buried inside a satire |
| 2 | **What Is a Holoject?** | [schrodingers-chatbot](schrodingers-chatbot.md) | New ontological category for LLMs; "are LLMs conscious?" is asked constantly |
| 3 | **Dimensional Poverty** | [infinite-dimensionality](infinite-dimensionality.md) + [high-dimensional-society](the-high-dimensional-society.md) | Your signature term; merge the 2024 and 2026 versions into one canonical definition |
| 4 | **Compress, Don't Collapse: A Test for Good Technology** | [infinite-dimensionality](infinite-dimensionality.md) + [can-technology-be-beautiful](can-technology-be-beautiful.md) | One criterion that covers alignment, beauty and social proxies |
| 5 | **What Does It Mean to Be "Ostrom Complete"?** | [our-planetary-predicament](our-planetary-predicament.md) | Memorable coinage: the coordination analogue of Turing complete |
| 6 | **The Confusion Tax** | [moral-natures](moral-natures-of-humans-and-machines.md) | Describing AI in human words costs twice: false traits read in, real novelty missed |
| 7 | **Legibility Parity** | [the-price-of-innovation](the-price-of-innovation.md) | A clean AI-governance principle: every gain in capability needs a matching gain in human judgment |
| 8 | **The Singularity's Contradiction** | [the-plurality](the-plurality-a-better-myth-for-ai.md) | Intelligence can't be both infinitely generative and infinitely powerful |
| 9 | **Whose Intelligence Is It? The Mind in Language** | [the-majesty-of-language](the-majesty-of-language.md) | The "semantic surprise": the intelligence in LLMs belongs to language |
| 10 | **The Contingency Argument for Human Specialness** | [life-is-special-enough](life-is-special-enough.md) | Answers "what makes humans special if AI can do everything?" without a secret sauce |
| 11 | **All Transcendence, None of the Finitude** | [homo-digitalis](homo-digitalis.md) | Explains what platforms and AI companions take away |
| 12 | **Can You Forgive a Self-Driving Car?** | [moral-natures](moral-natures-of-humans-and-machines.md) | Forbearance replaces forgiveness; a concrete hook with a real case (Cruise) |
| 13 | **Slop Is the Entropy Tax of Scale Without Judgment** | [the-plurality](the-plurality-a-better-myth-for-ai.md) | Quotable, timely, ties taste to constraint |
| 14 | **The Market Is an Innovation Idiot-Savant** | [a-constraint-theory](a-constraint-theory-of-technology.md) | Concedes markets' power while marking their limit; very citable |
| 15 | **Choosing a Century Is Like Becoming a Vampire** | [immaterial-progress](the-case-for-immaterial-progress.md) | L.A. Paul's transformative experience applied to the progress debate; original move |
| 16 | **The Contextual Chasm** | [good-digital-life](what-does-a-good-digital-life-look.md) | Why inherited wisdom stops working; engage Margaret Mead (see below) |

## Cross-essay micro articles

Ideas that recur across several essays. Each could be a canonical piece that the essays then point to.

| Theme | Where it recurs |
|---|---|
| **Coordination, not capability, is the bottleneck** | towards-a-philosophy-of-technology, progress-towards-what, our-planetary-predicament, manifesto, the-high-dimensional-society |
| **Advanced technology breaks trial and error** | towards-a-philosophy-of-technology, a-constraint-theory-of-technology, our-planetary-predicament, manifesto, how-philosophy-makes-technology-better |
| **Suboptimality and constraint are generative** | the-reverse-turing-test, life-is-special-enough, the-plurality, whats-the-deal-with-cognitive-augmentation, a-constraint-theory-of-technology, the-high-dimensional-society ("structurally sub-optimal") |
| **Certainty vs. possibility: what technology should optimize** | infinite-dimensionality, homo-digitalis, the-price-of-innovation, moral-natures-of-humans-and-machines |
| **"Not big enough": markets and states can't guide advanced technology** | towards-a-philosophy-of-technology, a-constraint-theory-of-technology, manifesto, whats-the-deal-with-cognitive-augmentation |
| **Can vs. ought** | calling-all-philosophers, progress-towards-what, how-philosophy-makes-technology-better |
| **Plurality against homogenization** | the-case-for-immaterial-progress, whats-the-deal-with-cognitive-augmentation (cognitive groupthink), the-plurality, the-high-dimensional-society |
| **AI and the return of the sacred** | how-philosophy-makes-technology-better ("second death of God"), towards-a-philosophy-of-technology, our-neo-romantic-rebellion, life-is-special-enough |
| **Meaning as geometry in embeddings** | the-majesty-of-language, the-high-dimensional-society (near-identical KING − MALE + FEMALE = QUEEN passages) |
| **Predict the human response, not the technology** | how-philosophy-makes-technology-better, our-neo-romantic-rebellion |
| **Data coalitions** | calling-all-philosophers (proposed seriously), our-neo-romantic-rebellion (inside the fiction) |
| **The free energy principle as a working tool** | infinite-dimensionality, homo-digitalis |

## Resolve before writing

- **Your definition of life in the manifesto.** It defines life as a cosmic drive toward wholeness that includes atoms and galaxies, but the same essay says life has happened only once, on Earth. A micro article on "Life itself as the foundation for technology ethics" needs to settle which you mean.
- **Margaret Mead.** The four speeds of cultural change in "What Does a Good Digital Life Look Like?" run close to Mead's post-, co- and prefigurative cultures (*Culture and Commitment*, 1970), which the essay doesn't cite. Naming her and saying what you add makes the piece stronger and more citable.
- **Peirce.** The essay never uses the word "abduction"; that framing comes from you and this analysis. Say so in the micro article and engage Peirce directly ("il lume naturale", his instinct-for-guessing argument).
- **Duplicates to merge, not repeat:** dimensional poverty (2024 and 2026 versions), "not big enough" (constraint theory and manifesto), and the embeddings passage (majesty and high-dimensional society).
