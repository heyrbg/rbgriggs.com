import { site } from "./site";

export const personId = `${site.url}/#person`;

export function personSchema(bio: string, interests: string[], offerings: { title: string; body: string }[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    description: bio,
    knowsAbout: interests,
    sameAs: site.sameAs,
    email: `mailto:${site.email}`,
    alternateName: "Brandon Griggs",
    jobTitle: "Writer and philosopher of technology; founder of Praxica Labs",
    worksFor: { "@type": "Organization", name: site.org.name, url: site.org.url },
    makesOffer: offerings.map((o) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: o.title, description: o.body, url: `${site.url}/work-with-me` },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    author: { "@id": personId },
    license: site.license.url,
  };
}
