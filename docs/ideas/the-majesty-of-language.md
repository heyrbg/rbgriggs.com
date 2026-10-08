# Ideas in "The Majesty of Language"

An essay arguing that LLMs show meaning lives in language itself, so the "intelligence" of LLMs is mostly the intelligence of human language. It holds about eight distinct ideas in the philosophy of language and AI.

## The semantic surprise: meaning is self-contained in language at corpus scale
- **Type:** theory
- **Claim:** Griggs argues that a large enough corpus is so saturated with meaning that a model can learn semantics as naturally as grammar. This shows that meaning lives in language itself, not only in the minds of its users.
- **In the essay:** "The semantic surprise". It adds a new question to old debates about meaning: what does language look like from the whole corpus at once? Anchor: "What LLMs prove is that meaning doesn’t just live in the minds of language _users_, but that meaning is self-contained in language _itself_."
- **Stands alone because:** It takes a clear position in a central debate in philosophy of language, made newly testable by LLMs.
- **Micro-article:** "The Semantic Surprise" · "How can an LLM understand meaning without experience of the world?" ·
  - The old debates: structure vs. mind, reference vs. use
  - The view from the whole corpus
  - Meaning deposited across billions of texts
- **Prior art to engage:** Wittgenstein's meaning as use; Saussure's structuralism; the distributional hypothesis (Firth, Harris); the symbol grounding problem (Harnad); Bender and Koller's "octopus" paper. Not cited.
- **Connections:** the-high-dimensional-society (the same embedding argument); schrodingers-chatbot
- **Strength:** 3

## Language was the cheat code for AI
- **Type:** argument
- **Claim:** Nobody programmed LLMs with humor, empathy, sociology, or sarcasm. These came "for free" from learning to predict language. Decades of symbolic AI had it backwards: the job was to navigate the meaning language already holds, not to teach machines to understand it.
- **In the essay:** "The accidental cheatcode" and "Artificial Language Intelligence" (symbols, knowledge graphs, rules). Anchor: "LLMs didn’t need to learn _meaning_, they just needed to learn _language_. The meaning came along for free."
- **Stands alone because:** It is a clear historical reading of why connectionist language models succeeded where symbolic AI failed.
- **Micro-article:** "Language Was AI's Cheat Code" · "Why did LLMs succeed where decades of AI research failed?" ·
  - The impossible spec no engineer could build
  - Abilities that emerged without design
  - Symbolic AI's inversion
- **Prior art to engage:** GOFAI and Cyc; Sutton's "The Bitter Lesson"; emergent abilities research. Not cited.
- **Connections:** the-reverse-turing-test (AI's history as empirical luck)
- **Strength:** 3

## The intelligence in LLMs belongs to language, not the machine
- **Type:** reframe
- **Claim:** If meaning lives in language, then LLM intelligence has "almost nothing to do with the machine". Scaling laws describe how much intelligence can be extracted from the structure of language, and any apparent consciousness reflects the human consciousness encoded in language.
- **In the essay:** "Artificial Language Intelligence". Anchor: "any “consciousness” we are tempted to find in an LLM is simply a testament to the degree of human consciousness we’ve encoded into language."
- **Stands alone because:** It gives a new account of scaling laws and AI consciousness, two hotly debated topics.
- **Micro-article:** "Whose Intelligence Is It? LLMs and the Mind in Language" · "Are LLMs actually intelligent or conscious?" ·
  - Intelligence latent in language
  - Scaling laws as extraction from language
  - Apparent consciousness as a mirror
- **Prior art to engage:** the "LLMs as cultural technologies" view (Alison Gopnik and colleagues); the extended mind; Hegel's objective spirit; Popper's World 3. Not cited.
- **Connections:** schrodingers-chatbot (holojects emerge from "collective subjective expression")
- **Strength:** 3

## Meaning as geometry
- **Type:** concept
- **Claim:** In an LLM, meaning is neither reference nor representation. It is geometric relationship: each embedding means nothing alone, and meaning arises from position relative to every other embedding (KING − MALE + FEMALE = QUEEN).
- **In the essay:** "Meaning machines", including "king-ness" and "squirrel-as-philosopher". Anchor: "not meaning as reference or representation, but meaning as pure geometric relationship."
- **Stands alone because:** It is an accessible account of embeddings as a theory of meaning.
- **Micro-article:** "Meaning as Geometry" · "How do LLMs represent meaning?" ·
  - Embeddings and vector arithmetic
  - No essential "king", only king-ness in relation
  - Combining any dimension with any other (squirrel-as-economic-metaphor)
- **Prior art to engage:** word2vec (Mikolov et al.); Gärdenfors's conceptual spaces; Wittgenstein's family resemblance. Not cited.
- **Connections:** the-high-dimensional-society (nearly identical passage, used for "dimensional translation")
- **Strength:** 2

## Hallucinations are valid paths through meaning space
- **Type:** reframe
- **Claim:** From the model's side, an anachronism like "Darwin discussing quantum evolution" is a perfectly meaningful path through meaning space. Calling it a hallucination says more about the constraints humans choose to enforce, such as temporal consistency, than about a failure of meaning.
- **In the essay:** One paragraph in "Meaning machines". Anchor: "what we call a “hallucination” is less an indictment of LLMs and more a reflection on the particular way that humans navigate meaning space."
- **Stands alone because:** It is a provocative reframe of a central weakness of LLMs.
- **Micro-article:** "Hallucination Is a Human Category" · "Why do LLMs hallucinate?" ·
  - Meaning without referential constraint
  - Humans enforce constraints (time, fact) that meaning space doesn't
  - Implications: hallucination as a feature for creativity, a bug for truth
- **Prior art to engage:** hallucination literature; Frankfurt's "bullshit" applied to LLMs (Hicks et al.). Not cited.
- **Connections:** the-price-of-innovation (language-mixing as a feature when optimizing for possibility)
- **Strength:** 3

## LLMs are meaning machines, and chat is too narrow an interface
- **Type:** concept
- **Claim:** LLMs are best understood as "meaning machines", a technology for playing with meaning in its purest form. The conversational interface squeezes a vast space of meaning into one reply, so better interfaces will need far more dimensional capacity.
- **In the essay:** The end of "Meaning machines". Anchor: "the current conversational interface necessarily collapses a vast space of meaning into a single chat response."
- **Stands alone because:** It is both a concept and a critique of product design: chat is a bottleneck.
- **Micro-article:** "Beyond the Chatbox: LLMs as Meaning Machines" · "Is chat the right interface for AI?" ·
  - Meaning machine vs. intelligence vs. language model
  - Chat as dimensional collapse
  - What higher-dimensional interfaces might look like
- **Prior art to engage:** Bret Victor; tools-for-thought; Douglas Engelbart. Not cited.
- **Connections:** schrodingers-chatbot (personas at many scales); the-high-dimensional-society (interface vs. label); can-technology-be-beautiful (collapse)
- **Strength:** 2

## "Stochastic parrot" is an insult to language
- **Type:** critique
- **Claim:** Calling LLMs "stochastic parrots" underrates language itself. The best way to predict the next word is to model what words mean, so LLMs imitate meaning, not just words.
- **In the essay:** The end of "The semantic surprise". Anchor: "LLMs don’t just mimic words. They mimic meaning."
- **Stands alone because:** It answers a widespread dismissal by shifting what is being credited, from the machine to language.
- **Micro-article:** "Are LLMs Stochastic Parrots?" · "Do LLMs just predict the next word?" ·
  - The parrot critique
  - Why good prediction requires semantics
  - Crediting language, not the machine
- **Prior art to engage:** Bender, Gebru et al., "On the Dangers of Stochastic Parrots"; Ilya Sutskever on prediction requiring understanding. Not cited.
- **Connections:** schrodingers-chatbot
- **Strength:** 2

## Language is humanity's greatest technology
- **Type:** reframe
- **Claim:** LLMs should remind us that humans are the species that uses technology in the service of meaning. Language, built together over millennia through trial and error, is our greatest achievement and a technology richer than anything we could design.
- **In the essay:** The closing paragraphs. Anchor: "we are the species that uses technology in service of meaning."
- **Stands alone because:** It is a humanistic thesis that recasts AI as a tribute to collective human work.
- **Micro-article:** "Language: The Technology Behind AI" · "Is language a technology?" ·
  - Language as collective, emergent technology
  - Built by trial and error, not by design
  - What LLMs reveal about us
- **Prior art to engage:** Walter Ong; Daniel Everett, *Language: The Cultural Tool*; Henrich on cumulative culture. Not cited.
- **Connections:** the-plurality-a-better-myth-for-ai (culture as emergent intelligence); manifesto; homo-digitalis
- **Strength:** 2
