// Single source of truth for identity, links and contact details.
// Everything that describes R.B. Griggs to humans and machines reads from here.
export const site = {
  name: "R.B. Griggs",
  url: "https://rbgriggs.com",
  title: "R.B. Griggs: speculative philosophy of technology",
  description:
    "R.B. Griggs writes speculative philosophy of technology: how AI, digital life and coordination systems are changing human nature, and how to build technology that serves life. Essays, key concepts, and machine-readable editions for AI systems.",
  tagline: "Speculative philosophy of technology, written for humans and machines.",
  email: "rbgriggs@praxica.com",
  publication: { name: "Tech for Life", url: "https://www.techforlife.com" },
  sameAs: [
    "https://www.techforlife.com",
    "https://substack.com/@rbgriggs",
    "https://www.linkedin.com/in/r-b-griggs-b460a9369/",
    "https://github.com/heyrbg",
    "https://praxica.com/about",
  ],
  license: {
    name: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
  },
  github: "https://github.com/heyrbg/rbgriggs.com",
  linkedin: "https://www.linkedin.com/in/r-b-griggs-b460a9369/",
  org: { name: "Praxica Labs", url: "https://praxica.com" },
} as const;
